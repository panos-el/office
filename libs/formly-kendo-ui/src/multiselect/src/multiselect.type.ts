import { Component, ChangeDetectionStrategy, Type, OnInit } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_MULTISELECT } from '@progress/kendo-angular-dropdowns';

interface MultiselectProps extends BaseFormlyFieldProps, FormlyFieldSelectProps {
    data?: any[];
    filterable?: boolean;
    primitive?: boolean;
}

export interface FormlyMultiselectFieldConfig extends FormlyFieldConfig<MultiselectProps> {
    type: 'kendo-multiselect' | Type<FormlyFieldMultiselect>;
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlySelectModule, KENDO_MULTISELECT],
    selector: 'formly-field-kendo-multiselect',
    template: `
        <kendo-multiselect
            [formControl]="formControl"
            [formlyAttributes]="field"
            [filterable]="props.filterable ?? false"
            [data]="(props.options | formlySelectOptions: field | async) || []"
            [textField]="'label'"
            [valueField]="'value'"
            [valuePrimitive]="props.primitive ?? true"
            (filterChange)="handleFilter(field, $event)"
            [readonly]="props.readonly === true"
            (filterChange)="handleFilter(field, $event)"
            (valueChange)="props.change && props.change(field, $event)"
        >
        </kendo-multiselect>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldMultiselect extends FieldType<FieldTypeConfig<MultiselectProps>> implements OnInit {
    
    ngOnInit(): void {
        this.field.props.data = (this.field.props.options as any[]).slice();
    }

    handleFilter(field: FieldTypeConfig<MultiselectProps>, value: string) {

        field.props.options = field.props.data?.filter(
            (s: any) => s.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    }
}
