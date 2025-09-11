import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormlyFieldTextBox } from './textbox.type';
import { FormlyFormFieldModule } from '../../form-field/src/public_api';
import { withFormlyFieldTextBox } from './textbox.config';

@NgModule({
    declarations: [FormlyFieldTextBox],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyFormFieldModule,
        InputsModule,
        FormlyModule.forChild(withFormlyFieldTextBox()),
    ],
})
export class FormlyTextBoxModule { }