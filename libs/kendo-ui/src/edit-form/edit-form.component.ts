import { Component, computed, Directive, effect, EventEmitter, inject, Injectable, input, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
import { FormlyForm, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { PrimeNG } from 'primeng/config';
import { ToastrService } from 'ngx-toastr';

import { BASE_URL, ClientDataService, DialogResultEnum, EditFormOptions, getLeafNodesWithKeys, mapDateProperties, stateAnimation } from '@office/core';
import { CommonModule } from '@angular/common';

import clonedeep from 'lodash.clonedeep';
import isequal from 'lodash.isequal';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogOptions } from '../confirmation-dialog/confirmation-dialog.component';
import { Gutters, KENDO_INPUTS, Orientation, ResponsiveFormBreakPoint } from '@progress/kendo-angular-inputs';

import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map } from 'rxjs';

const SCREEN_SIZE = '(max-width: 576px)';

export interface FormlyFieldPropsEvent {
    properties: { [key: string]: FormlyFieldConfig };
    model: any;
    form: FormGroup;
}

export interface RequestProperties {
    url: string;
    params: { [key: string]: any };
}

@Injectable()
export class KendoEditFormContextService {
    private _editForm: undefined | KendoEditFormComponent;

    public get editForm(): KendoEditFormComponent {
        return this._editForm as KendoEditFormComponent;
    }

    register(form: KendoEditFormComponent) {
        this._editForm = form;
    }

    clean() {
        this._editForm = undefined;
    }

    canDeactivate(): boolean | Promise<boolean> {
        return this._editForm?.canDeactivate() ?? true;
    }
}

@Directive({
    selector: '[kendoEditFormDirective]',
    standalone: true
})
export class KendoEditFormDirective implements OnInit {
    protected context = inject(KendoEditFormContextService);

    public ngOnInit(): void {
        this.context.editForm.editFormDirective = this;

        this.context.editForm.loadProperties();
        this.context.editForm.loadForm();
    }
}

@Component({
    selector: 'kendo-edit-form',
    templateUrl: './edit-form.component.html',
    providers: [
        /* NOT INCLUDE KendoEditFormContextService */
    ],
    imports: [CommonModule, ReactiveFormsModule, FormlyForm, KendoEditFormDirective, KENDO_TOOLBAR, KENDO_INPUTS],
    animations: [stateAnimation]
})
export class KendoEditFormComponent implements OnInit, OnDestroy {
    private primeng = inject(PrimeNG);

    @Input() animate: boolean = true;
    @Input() settingsEnable: boolean = false;
    @Input() settingsLabel = this.primeng.getTranslation('common.actions');
    @Input() settingsData!: any[];
    @Input() formOptions!: EditFormOptions;
    @Input() gutters: string | number | Gutters | ResponsiveFormBreakPoint[] = { cols: 32, rows: 32};

    @Output() formlyFieldPropsChange: EventEmitter<FormlyFieldPropsEvent> = new EventEmitter();

    orientation = input<Orientation>('horizontal');
    cols        = input<number>(2);

    editFormDirective!: KendoEditFormDirective;

    loading!: boolean;
    pageTitle!: string;
    saveLabel!: string;
    saveAndExitLabel!: string;
    cancelLabel!: string;
    backLabel!: string;

    url!: string;
    params!: { [key: string]: any };

    originalModel: any;
    form = new UntypedFormGroup({});
    model: any;
    options: FormlyFormOptions = {};
    fields!: FormlyFieldConfig[];

    get isDirty() {
        return !isequal(this.model, this.originalModel);
    }

    private context = inject(KendoEditFormContextService);
    private dialogService = inject(ConfirmationDialogService);

    baseUrl = inject(BASE_URL);
    bo = inject(BreakpointObserver);

    readonly isSmall = toSignal(
        this.bo.observe([SCREEN_SIZE]).pipe(
        map(state => state.breakpoints[SCREEN_SIZE] === true),
            distinctUntilChanged()
        ),
        {
        // good initial value so first render matches current size (SSR-safe check)
        initialValue: typeof window !== 'undefined' ? window.matchMedia(SCREEN_SIZE).matches : false
        }
    );
    
    readonly effectiveOrientation = computed<Orientation>(() =>
        this.orientation() === 'horizontal'
        ? (this.isSmall() ? 'vertical' : 'horizontal')
        : this.orientation()
    );

    readonly effectiveCols = computed<number>(() =>
        this.orientation() === 'horizontal'
        ? (this.isSmall() ? 1 : 2)
        : this.cols()
    );

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dataService: ClientDataService,
        private toastrService: ToastrService
    ) {
        this.context.register(this);
    }

    // Guard method to check if the form can be deactivated
    canDeactivate(): Promise<boolean> | boolean {
        if (!this.isDirty) return true;

        const options: ConfirmationDialogOptions = {
            message: this.primeng.getTranslation('message.canDeactivate'),
            title: this.primeng.getTranslation('common.warning')
        };

        return this.dialogService.open(options).then((result) => {
            return result === DialogResultEnum.Yes ? true : false;
        });
    }

    ngOnInit(): void {
        this.saveLabel = this.primeng.getTranslation('common.save');
        this.saveAndExitLabel = this.primeng.getTranslation('common.saveAndExit');
        this.cancelLabel = this.primeng.getTranslation('common.cancel');
        this.backLabel = this.primeng.getTranslation('common.back');
    }

    ngOnDestroy(): void {
        this.context.clean();
    }

    private _getRequestProperties(): RequestProperties {
        const idParam = this.route.snapshot.paramMap.get('id');
        const id = idParam ? Number(idParam) : 0;

        // treat missing/NaN id as "create"
        const isCreate = !id || Number.isNaN(id);

        const createParams: { [key: string]: any } = { ...(this.formOptions?.createParams ?? {}) };
        const editParams: { [key: string]: any } = { ...(this.formOptions?.editParams ?? {}), id };

        const action = isCreate ? this.formOptions.createUrl : this.formOptions.editUrl;
        const params = isCreate ? createParams : editParams;
        const url = `${this.baseUrl}${action}`;

        return { url, params };
    }

    public loadProperties() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const isCreate = id === 0;

        const createParams: { [key: string]: any } = { ...(this.formOptions?.createParams ?? {}) };
        const editParams: { [key: string]: any } = { ...(this.formOptions?.editParams ?? {}), id };

        const action = isCreate ? this.formOptions.createUrl : this.formOptions.editUrl;

        this.params = isCreate ? createParams : editParams;
        this.url = `${this.baseUrl}${action}`;
    }

    public loadForm() {
        this.loading = true;
        this.dataService
            .fetchJsonBodyGet(this.url, this.params)
            .then((result: any) => {
                mapDateProperties(result.model);
                this.originalModel = clonedeep(result.model);
                this.model = clonedeep(result.model);

                const properties = {
                    properties: getLeafNodesWithKeys(result.form.fields),
                    model: this.model,
                    form: this.form
                };

                this.formlyFieldPropsChange.emit(properties);
                this.pageTitle = result.form.title;
                this.fields = result.form.fields;
            })
            .catch((error: Error) => {
                Promise.reject(error);
            })
            .finally(() => (this.loading = false));
    }

    public saveChanges(deactivating: boolean = false) {
        this.loading = true;
        this.dataService
            .fetchJsonBodyPost(this.url, this.model, this.params)
            .then((result: any) => {
                this.options.resetModel!();

                const nav = !deactivating
                    ? this.router.navigate([this.formOptions.parentUrl], { skipLocationChange: true }).then(() => this.router.navigate([this.formOptions.parentUrl, result.id], { replaceUrl: true }))
                    : this.router.navigate([this.formOptions.parentUrl]);

                nav.then(() => this.toastrService.success(this.primeng.getTranslation('message.successfullySaved')));
            })
            .catch((error: Error) => {
                Promise.reject(error);
            })
            .finally(() => (this.loading = false));
    }

    public cancelChanges() {
        this.options.resetModel!();
    }

    public goBack() {
        this.router.navigate([this.formOptions.parentUrl]);
    }
}
