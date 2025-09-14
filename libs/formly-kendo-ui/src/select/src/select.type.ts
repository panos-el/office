import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';

interface SelectProps extends BaseFormlyFieldProps, FormlyFieldSelectProps {
  primitive?: boolean;
}

export interface FormlySelectFieldConfig extends FormlyFieldConfig<SelectProps> {
  type: 'kendo-select' | Type<FormlyFieldSelect>
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlySelectModule, KENDO_DROPDOWNLIST],
  selector: 'formly-field-kendo-select',
  template: `
    <kendo-dropdownlist
      [formControl]="formControl"
      [formlyAttributes]="field"
      [data]="props.options | formlySelectOptions: field | async"
      [textField]="'label'"
      [valueField]="'value'"
      [valuePrimitive]="props.primitive ?? true"
      (valueChange)="props.change && props.change(field, $event)"
    >
    </kendo-dropdownlist>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelect extends FieldType<FieldTypeConfig<SelectProps>> {}
