import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_TEXTAREA } from '@progress/kendo-angular-inputs';

interface TextAreaProps extends BaseFormlyFieldProps {}

export interface FormlyTextAreaFieldConfig extends FormlyFieldConfig<TextAreaProps> {
  type: 'kendo-textarea' | Type<FormlyFieldTextArea>
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_TEXTAREA],
  selector: 'formly-field-kendo-textarea',
  template: ` <textarea kendoTextArea [rows]="props.rows" [formControl]="formControl" [formlyAttributes]="field"></textarea> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextArea extends FieldType<FieldTypeConfig<TextAreaProps>> {}
