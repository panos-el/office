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
    selector: 'kendo-edit-form',
    templateUrl: './edit-form.html',
    providers: [
        /* not include CanDeactivateService, */
        { provide: EditFormToken, useExisting: forwardRef(() => KendoEditFormComponent) }
    ],
    imports: [CommonModule, ReactiveFormsModule, FormlyForm, KENDO_TOOLBAR, KENDO_INPUTS],
    animations: [stateAnimation]
})
export class KendoEditFormComponent extends EditFormBase {
}
