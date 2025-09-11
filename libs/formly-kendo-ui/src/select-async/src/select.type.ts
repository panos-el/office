import { Component, ChangeDetectionStrategy, Type, inject } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { FormlyFieldSelectProps } from '@ngx-formly/core/select';
import { UiKendoService } from '../../lib/ui-kendo.service';

interface SelectAsyncProps extends BaseFormlyFieldProps, FormlyFieldSelectProps {
  primitive?: boolean;
  controller: string;
  action: string;
}

export interface FormlySelectAsyncFieldConfig extends FormlyFieldConfig<SelectAsyncProps> {
  type: 'kendo-select-async' | Type<FormlyFieldSelectAsync>;
}

@Component({
  standalone: false,
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
