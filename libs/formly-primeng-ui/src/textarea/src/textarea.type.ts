import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';

interface TextAreaProps extends BaseFormlyFieldProps {}

export interface FormlyTextAreaFieldConfig extends FormlyFieldConfig<TextAreaProps> {
  type: 'kendo-textarea' | Type<FormlyFieldTextArea>;
}

@Component({
  standalone: false,
  selector: 'formly-field-kendo-textarea',
  template: ` <textarea kendoTextArea [formControl]="formControl" [formlyAttributes]="field"></textarea> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextArea extends FieldType<FieldTypeConfig<TextAreaProps>> {}
