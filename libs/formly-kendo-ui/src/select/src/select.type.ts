import { Component, ChangeDetectionStrategy, Type, OnInit } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';

interface SelectProps extends BaseFormlyFieldProps, FormlyFieldSelectProps {
    data?: any[];
    filterable?: boolean;
    primitive?: boolean;
    defaultItem?: { label: string; value: number } | any;
}

export interface FormlySelectFieldConfig extends FormlyFieldConfig<SelectProps> {
    type: 'kendo-select' | Type<FormlyFieldSelect>;
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlySelectModule, KENDO_DROPDOWNLIST],
    selector: 'formly-field-kendo-select',
    template: `
        <kendo-dropdownlist
            [formControl]="formControl"
            [formlyAttributes]="field"
            [filterable]="props.filterable ?? false"
            [data]="props.options | formlySelectOptions: field | async"
            [textField]="'label'"
            [valueField]="'value'"
            [defaultItem]="props.defaultItem"
            [valuePrimitive]="props.primitive ?? true"
            (filterChange)="handleFilter(field, $event)"
            (valueChange)="props.change && props.change(field, $event)"
        >
        </kendo-dropdownlist>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldSelect extends FieldType<FieldTypeConfig<SelectProps>> implements OnInit {

    ngOnInit(): void {
        this.field.props.data = (this.field.props.options as any[]).slice();
    }

    // override defaultOptions = {
    //     hooks: {
    //         onInit: (_field: FormlyFieldConfig) => {
    //             const field = _field as FieldTypeConfig<SelectProps>;
    //             const options = field.props.options as any[];

    //             field.props.data = options.slice();
    //         },
    //     }
    // };

    handleFilter(field: FieldTypeConfig<SelectProps>, value: string) {

        field.props.options = field.props.data?.filter(
            (s: any) => s.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    }
}
