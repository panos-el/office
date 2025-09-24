// import { Component, computed, EventEmitter, forwardRef, inject, input, Input, OnInit, Output } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
// import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
// import { FormlyForm, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
// import { PrimeNG } from 'primeng/config';
// import { ToastrService } from 'ngx-toastr';

// import { BASE_URL, ClientDataService, DialogResultEnum, EditFormOptions, mapDateProperties, stateAnimation } from '@office/core';
// import { CommonModule } from '@angular/common';

// import clonedeep from 'lodash.clonedeep';
// import isequal from 'lodash.isequal';
// import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
// import { ConfirmationDialogOptions } from '../../confirmation-dialog/confirmation-dialog.component';
// import { Gutters, KENDO_INPUTS, Orientation, ResponsiveFormBreakPoint } from '@progress/kendo-angular-inputs';

// import { BreakpointObserver } from '@angular/cdk/layout';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { distinctUntilChanged, map, Observable } from 'rxjs';
// import { EditFormToken, SCREEN_SIZE } from '../api/edit-form-token';
// import { CanDeactivateService, CanLeave } from '../api/can-deactivate.guard';
// import { FormlyContext } from '../api/formly-context';

// @Component({
//     selector: 'kendo-edit-form-simple',
//     templateUrl: './edit-form-simple.html',
//     providers: [
//         /* not include CanDeactivateService, */
//         { provide: EditFormToken, useExisting: forwardRef(() => KendoEditFormSimpleComponent) }
//     ],
//     imports: [CommonModule, ReactiveFormsModule, FormlyForm, KENDO_TOOLBAR, KENDO_INPUTS],
//     animations: [stateAnimation]
// })
// export class KendoEditFormSimpleComponent extends EditFormToken implements OnInit, CanLeave {
//     private primeng = inject(PrimeNG);

//     @Input() animate: boolean = true;
//     @Input() settingsEnable: boolean = false;
//     @Input() settingsLabel = this.primeng.getTranslation('common.actions');
//     @Input() settingsData!: any[];
//     @Input() formOptions!: EditFormOptions;
//     @Input() gutters: string | number | Gutters | ResponsiveFormBreakPoint[] = { cols: 32, rows: 32 };

//     @Output() formlyContextChange: EventEmitter<FormlyContext> = new EventEmitter();

//     orientation = input<Orientation>('horizontal');
//     cols = input<number>(2);

//     loading!: boolean;
//     pageTitle!: string;
//     saveLabel!: string;
//     saveAndExitLabel!: string;
//     cancelLabel!: string;
//     backLabel!: string;

//     url!: string;
//     params!: { [key: string]: any };

//     originalModel: any;
//     @Input() form = new UntypedFormGroup({});
//     model: any;
//     options: FormlyFormOptions = {};
//     fields!: FormlyFieldConfig[];

//     get isDirty() {
//         return !isequal(this.model, this.originalModel);
//     }

//     private dialogService = inject(ConfirmationDialogService);

//     baseUrl = inject(BASE_URL);
//     bo = inject(BreakpointObserver);

//     readonly isSmall = toSignal(
//         this.bo.observe([SCREEN_SIZE]).pipe(
//             map((state) => state.breakpoints[SCREEN_SIZE] === true),
//             distinctUntilChanged()
//         ),
//         {
//             // good initial value so first render matches current size (SSR-safe check)
//             initialValue: typeof window !== 'undefined' ? window.matchMedia(SCREEN_SIZE).matches : false
//         }
//     );

//     readonly effectiveOrientation = computed<Orientation>(() => (this.orientation() === 'horizontal' ? (this.isSmall() ? 'vertical' : 'horizontal') : this.orientation()));

//     readonly effectiveCols = computed<number>(() => (this.orientation() === 'horizontal' ? (this.isSmall() ? 1 : 2) : this.cols()));

//     context = inject(CanDeactivateService);

//     constructor(
//         private router: Router,
//         private route: ActivatedRoute,
//         private dataService: ClientDataService,
//         private toastrService: ToastrService
//     ) {
//         super();
//         this.context.form = this;
//     }

//     // Guard method to check if the form can be deactivated
//     canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
//         if (!this.isDirty) return true;

//         const options: ConfirmationDialogOptions = {
//             message: this.primeng.getTranslation('message.canDeactivate'),
//             title: this.primeng.getTranslation('common.warning')
//         };

//         return this.dialogService.open(options).then((result) => {
//             return result === DialogResultEnum.Yes ? true : false;
//         });
//     }

//     ngOnInit(): void {
//         this.saveLabel = this.primeng.getTranslation('common.save');
//         this.saveAndExitLabel = this.primeng.getTranslation('common.saveAndExit');
//         this.cancelLabel = this.primeng.getTranslation('common.cancel');
//         this.backLabel = this.primeng.getTranslation('common.back');

//         this.loadProperties();
//         this.loadForm();
//     }

//     public loadProperties() {
//         this.url = `${this.baseUrl}${this.formOptions.editUrl}`;
//     }

//     public loadForm() {
//         this.loading = true;
//         this.dataService
//             .fetchJsonBodyGet(this.url, this.params)
//             .then((result: any) => {
//                 mapDateProperties(result.model);
//                 this.originalModel = clonedeep(result.model);
//                 this.model = clonedeep(result.model);

//                 this.pageTitle = result.form.title;
//                 this.fields = result.form.fields;
                
//                 const ctx: FormlyContext = {
//                     form: this.form,
//                     model: this.model,
//                     options: this.options,
//                     fields: this.fields,
//                 };

//                 this.formlyContextChange.emit(ctx);
//             })
//             .catch((error: Error) => {
//                 Promise.reject(error);
//             })
//             .finally(() => (this.loading = false));
//     }

//     private afterSaveNavigation(deactivating: boolean) {
//         if (deactivating)
//             return this.router.navigate([this.formOptions.parentUrl]);

//         const currentUrl = this.router.url;
//         return this.router.navigate([this.formOptions.parentUrl], { skipLocationChange: true })
//             .then(() => { 
//                 this.router.navigate([currentUrl], { replaceUrl: true })
//             });
//     }

//     public saveChanges(deactivating: boolean = false) {
//         this.loading = true;
//         this.dataService
//             .fetchJsonBodyPost(this.url, this.model, this.params)
//             .then(async () => {              
//                 this.originalModel = clonedeep(this.model);  
//                 this.afterSaveNavigation(deactivating).then(() => {
//                     this.toastrService.success(this.primeng.getTranslation('message.successfullySaved'));
//                 });
//             })
//             .catch((error: Error) => {
//                 Promise.reject(error);
//             })
//             .finally(() => (this.loading = false));
//     }

//     public cancelChanges() {
//         this.options.resetModel!();
//     }

//     public goBack() {
//         this.router.navigate([this.formOptions.parentUrl]);
//     }
// }

import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
import { FormlyForm } from '@ngx-formly/core';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';

import { EditFormToken } from '../api/edit-form-token';
import { stateAnimation } from '@office/core';
import { EditFormBase } from '../api/edit-form.base';

@Component({
    selector: 'kendo-edit-form-simple',
    templateUrl: './edit-form-simple.html',
    providers: [
        /* not include CanDeactivateService, */
        { provide: EditFormToken, useExisting: forwardRef(() => KendoEditFormSimpleComponent) }
    ],
    imports: [CommonModule, ReactiveFormsModule, FormlyForm, KENDO_TOOLBAR, KENDO_INPUTS],
    animations: [stateAnimation]
})
export class KendoEditFormSimpleComponent extends EditFormBase {

    protected override loadProperties(): void {
        this.url = `${this.baseUrl}${this.formOptions.editUrl}`;
    }

    protected override afterSaveNavigation(deactivating: boolean) {
        if (deactivating)
            return this.router.navigate([this.formOptions.parentUrl]);

        const currentUrl = this.router.url;
        return this.router.navigate([this.formOptions.parentUrl], { skipLocationChange: true })
            .then(() => { 
                this.router.navigate([currentUrl], { replaceUrl: true })
            });
    }

}
