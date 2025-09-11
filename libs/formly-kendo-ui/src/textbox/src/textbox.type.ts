import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';

interface TextBoxProps extends BaseFormlyFieldProps {}

export interface FormlyTextBoxFieldConfig extends FormlyFieldConfig<TextBoxProps> {
  type: 'kendo-textbox' | Type<FormlyFieldTextBox>;
}

@Component({
  standalone: false,
  selector: 'formly-field-kendo-textbox',
  template: ` <input kendoTextBox [formControl]="formControl" [formlyAttributes]="field"/> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextBox extends FieldType<FieldTypeConfig<TextBoxProps>> {}