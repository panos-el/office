import { Component, ChangeDetectionStrategy, ViewEncapsulation, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_CHECKBOX } from '@progress/kendo-angular-inputs';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';

interface CheckboxProps extends BaseFormlyFieldProps {}

export interface FormlyCheckboxFieldConfig extends FormlyFieldConfig<CheckboxProps> {
  type: 'kendo-checkbox' | Type<FormlyFieldCheckbox>
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_CHECKBOX ],
  selector: 'formly-field-kendo-checkbox',
  template: `
    <input type="checkbox" kendoCheckBox [formControl]="formControl" [formlyAttributes]="field" />
    <label [for]="id" class="k-checkbox-label">
      {{ props.label }}
      @if(props.required && props.hideRequiredMarker !== true) { <span aria-hidden="true" class="k-required">*</span> }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkbox.type.scss'],
})
export class FormlyFieldCheckbox extends FieldType<FieldTypeConfig<CheckboxProps>> {
  override defaultOptions = {
    props: {
      hideLabel: true,
    },
  };
}
