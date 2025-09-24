import { Directive, Input, Output, EventEmitter, OnInit, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { PrimeNG } from 'primeng/config';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { BASE_URL, ClientDataService, DialogResultEnum, EditFormOptions, mapDateProperties } from '@office/core';

import { Gutters, Orientation, ResponsiveFormBreakPoint } from '@progress/kendo-angular-inputs';

import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogOptions } from '../../confirmation-dialog/confirmation-dialog.component';

import { EditFormToken, SCREEN_SIZE } from '../api/edit-form-token';
import { CanDeactivateService, CanLeave } from '../api/can-deactivate.guard';
import { FormlyContext } from '../api/formly-context';

import clonedeep from 'lodash.clonedeep';
import isequal from 'lodash.isequal';

@Directive()
export abstract class EditFormBase<TModel = any> extends EditFormToken implements OnInit, CanLeave {
    // ===== DI via inject() so children don't need constructors =====
    protected primeng = inject(PrimeNG);
    protected router = inject(Router);
    protected route = inject(ActivatedRoute);
    protected dataService = inject(ClientDataService);
    protected toastrService = inject(ToastrService);
    protected dialogService = inject(ConfirmationDialogService);
    protected baseUrl = inject(BASE_URL);
    protected bo = inject(BreakpointObserver);
    protected context = inject(CanDeactivateService);

    // ===== Inputs / Outputs (keep same names/signatures) =====
    @Input() animate: boolean = true;
    @Input() settingsEnable: boolean = false;
    @Input() settingsLabel = this.primeng.getTranslation('common.actions');
    @Input() settingsData!: any[];
    @Input() formOptions!: EditFormOptions;
    @Input() gutters: string | number | Gutters | ResponsiveFormBreakPoint[] = { cols: 32, rows: 32 };

    @Output() formlyContextChange: EventEmitter<FormlyContext> = new EventEmitter<FormlyContext>();

    orientation = input<Orientation>('horizontal');
    cols = input<number>(2);

    // ===== State =====
    loading!: boolean;
    pageTitle!: string;
    saveLabel!: string;
    saveAndExitLabel!: string;
    cancelLabel!: string;
    backLabel!: string;

    url!: string;
    params!: { [key: string]: any };
    currentUrl!: string;

    originalModel!: TModel;
    @Input() form = new UntypedFormGroup({});
    model!: TModel;
    options: FormlyFormOptions = {};
    fields!: FormlyFieldConfig[];

    get isDirty() {
        return !isequal(this.model, this.originalModel);
    }

    // ===== Responsive helpers (unchanged behavior) =====
    readonly isSmall = toSignal(
        this.bo.observe([SCREEN_SIZE]).pipe(
            map((state) => state.breakpoints[SCREEN_SIZE] === true),
            distinctUntilChanged()
        ),
        {
            initialValue: typeof window !== 'undefined' ? window.matchMedia(SCREEN_SIZE).matches : false
        }
    );

    readonly effectiveOrientation = computed<Orientation>(() => (this.orientation() === 'horizontal' ? (this.isSmall() ? 'vertical' : 'horizontal') : this.orientation()));

    readonly effectiveCols = computed<number>(() => (this.orientation() === 'horizontal' ? (this.isSmall() ? 1 : 2) : this.cols()));

    constructor() {
        super();
        // wire CanDeactivate context
        this.context.form = this;
    }

    // ===== Guard =====
    canDeactivate(): boolean | Promise<boolean> {
        if (!this.isDirty) return true;

        const options: ConfirmationDialogOptions = {
            message: this.primeng.getTranslation('message.canDeactivate'),
            title: this.primeng.getTranslation('common.warning')
        };

        return this.dialogService.open(options).then((result) => result === DialogResultEnum.Yes);
    }

    // ===== Lifecycle =====
    ngOnInit(): void {
        this.saveLabel = this.primeng.getTranslation('common.save');
        this.saveAndExitLabel = this.primeng.getTranslation('common.saveAndExit');
        this.cancelLabel = this.primeng.getTranslation('common.cancel');
        this.backLabel = this.primeng.getTranslation('common.back');

        const path = this.router.routerState.snapshot.url.split(/[?#]/)[0].replace(/\/+$/, '');
        this.currentUrl = path.substring(0, path.lastIndexOf('/')) || '/';

        this.loadProperties();
        this.loadForm();
    }

    // ===== Behavior moved from component =====
    protected loadProperties() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const isCreate = id === 0;

        const createParams: { [key: string]: any } = { ...(this.formOptions?.createParams ?? {}) };
        const editParams: { [key: string]: any } = { ...(this.formOptions?.editParams ?? {}), id };

        const action = isCreate ? this.formOptions.createUrl : this.formOptions.editUrl;

        this.params = isCreate ? createParams : editParams;
        this.url = `${this.baseUrl}${action}`;
    }

    protected loadForm() {
        this.loading = true;
        this.dataService
            .fetchJsonBodyGet(this.url, this.params)
            .then((result: any) => {
                mapDateProperties(result.model);
                this.originalModel = clonedeep(result.model);
                this.model = clonedeep(result.model);

                this.pageTitle = result.form.title;
                this.fields = result.form.fields;

                const ctx: FormlyContext = {
                    form: this.form,
                    model: this.model,
                    options: this.options,
                    fields: this.fields
                };

                this.formlyContextChange.emit(ctx);
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })
            .finally(() => (this.loading = false));
    }

    protected afterSaveNavigation(deactivating: boolean, id?: any) {
        if (deactivating) return this.router.navigate([this.formOptions.parentUrl]);

        return this.router.navigate([this.formOptions.parentUrl], { skipLocationChange: true }).then(() => {
            this.router.navigate([this.currentUrl, id], { replaceUrl: true });
        });
    }

    protected saveChanges(deactivating: boolean = false) {
        this.loading = true;
        this.dataService
            .fetchJsonBodyPost(this.url, this.model, this.params)
            .then((result: any) => {
                this.originalModel = clonedeep(this.model);
                this.afterSaveNavigation(deactivating, result?.id).then(() => {
                    this.toastrService.success(this.primeng.getTranslation('message.successfullySaved'));
                });
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })
            .finally(() => (this.loading = false));
    }

    protected cancelChanges() {
        this.options.resetModel?.();
    }

    protected goBack() {
        this.router.navigate([this.formOptions.parentUrl]);
    }
}
