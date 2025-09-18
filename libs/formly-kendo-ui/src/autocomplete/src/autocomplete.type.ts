import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_AUTOCOMPLETE } from '@progress/kendo-angular-dropdowns';

interface AutocompleteProps extends BaseFormlyFieldProps, FormlyFieldSelectProps {
    data?: any[];
}

export interface FormlyAutocompleteFieldConfig extends FormlyFieldConfig<AutocompleteProps> {
    type: 'autocomplete' | Type<FormlyFieldAutocomplete>;
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlySelectModule, KENDO_AUTOCOMPLETE ],
    selector: 'formly-field-kendo-autocomplete',
    template: `
    <kendo-autocomplete
      [formControl]="formControl"
      [formlyAttributes]="field"
      [data]="props.options | formlySelectOptions: field"
      [valueField]="'value'"
      [filterable]="true"
      (filterChange)="handleFilter($event,field)"
      (valueChange)="props.change && props.change(field, $event)"
    >
    </kendo-autocomplete>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldAutocomplete extends FieldType<FieldTypeConfig<AutocompleteProps>> {

    override defaultOptions = {
        hooks: {
            onInit: (_field: FormlyFieldConfig) => {
                const field = _field as FieldTypeConfig<AutocompleteProps>;
                const options = field.props.options as any[];

                field.props.data = options.slice();
            },
        }
    };

    handleFilter(value: string, field: FieldTypeConfig<AutocompleteProps>) {

        field.props.options = field.props.data?.filter(
            (s: any) => s.value.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    }
}
