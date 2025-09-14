import { Component, ChangeDetectionStrategy, Type, inject } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select';
import { UiKendoService } from '../../lib/ui-kendo.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';

interface SelectAsyncProps extends BaseFormlyFieldProps, FormlyFieldSelectProps {
  primitive?: boolean;
  controller: string;
  action: string;
}

export interface FormlySelectAsyncFieldConfig extends FormlyFieldConfig<SelectAsyncProps> {
  type: 'kendo-select-async' | Type<FormlyFieldSelectAsync>
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlySelectModule, KENDO_DROPDOWNLIST],
  selector: 'formly-field-kendo-select-async',
  template: `
    <kendo-dropdownlist
      [formControl]="formControl"
      [formlyAttributes]="field"
      [data]="props.options | formlySelectOptions: field | async"
      [textField]="$any(props).labelProp || 'label'"
      [valueField]="$any(props).valueProp || 'value'"
      [valuePrimitive]="props.primitive ?? true"
      (valueChange)="props.change && props.change(field, $event)"
    >
    </kendo-dropdownlist>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelectAsync extends FieldType<FieldTypeConfig<SelectAsyncProps>> {
  uiKendoService = inject(UiKendoService);

  onPopulate(field: FormlyFieldConfig) {    
    const props = field.props as any;

    props.options = this.uiKendoService.loadOptions(props.controller,props.action);
  }
}
