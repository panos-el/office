import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { CommonModule } from '@angular/common';

interface TextBoxProps extends BaseFormlyFieldProps {}

export interface FormlyTextBoxFieldConfig extends FormlyFieldConfig<TextBoxProps> {
  type: 'kendo-textbox' | Type<FormlyFieldTextBox>
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_TEXTBOX],
  selector: 'formly-field-kendo-textbox',
  template: ` <input kendoTextBox [formControl]="formControl" [formlyAttributes]="field"/> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextBox extends FieldType<FieldTypeConfig<TextBoxProps>> {}