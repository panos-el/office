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
