import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_MULTISELECT } from '@progress/kendo-angular-dropdowns';

interface MultiselectProps extends BaseFormlyFieldProps, FormlyFieldSelectProps { }

export interface FormlyMultiselectFieldConfig extends FormlyFieldConfig<MultiselectProps> {
  type: 'kendo-multiselect' | Type<FormlyFieldMultiselect>
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlySelectModule, KENDO_MULTISELECT],
  selector: 'formly-field-kendo-multiselect',
  template: `
    <kendo-multiselect
      [formControl]="formControl"
      [formlyAttributes]="field"
      [data]="_options"
      [textField]="'label'"
      [valueField]="'value'"
      [valuePrimitive]="true"
      [readonly]="props.readonly === true"
      (valueChange)="props.change && props.change(field, $event)"
    >
    </kendo-multiselect>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldMultiselect extends FieldType<FieldTypeConfig<MultiselectProps>> {
    public get _options(): any[] {
        return this.props.options as any[];
    }
}
