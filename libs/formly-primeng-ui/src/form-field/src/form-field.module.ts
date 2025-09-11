import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyWrapperFormField } from './form-field.wrapper';
import { FormFieldModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { withFormlyFormField } from './form-field.config';
import { FormlyWrapperPanel } from './panel.wrapper';
import { FormlyWrapperHorizontalField } from './horizontal-field.wrapper';
import { FormlyWrapperVerticalField } from './vertical-field.wrapper';

@NgModule({
  declarations: [
    FormlyWrapperFormField, 
    FormlyWrapperHorizontalField, 
    FormlyWrapperFormField, 
    FormlyWrapperVerticalField
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    LabelModule,

    FormlyModule.forChild(withFormlyFormField()),
  ],
})
export class FormlyFormFieldModule {}
