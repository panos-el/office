import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { KENDO_NUMERICTEXTBOX } from '@progress/kendo-angular-inputs';
import { BaseFormlyFieldProps, FieldType } from '../../form-field';

interface NumericTextboxProps extends BaseFormlyFieldProps {
    decimals?: number;
    format?: string;
    spinners?: boolean;
    nullable?: boolean;
}

export interface FormlyNumericFieldConfig extends FormlyFieldConfig<NumericTextboxProps> {
    type: 'kendo-numerictextbox' | Type<FormlyFieldNumericTextbox>;
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_NUMERICTEXTBOX],
    selector: 'formly-field-kendo-numerictextbox',
    template: `
        <kendo-numerictextbox
            [formlyAttributes]="field"
            [formControl]="formControl"
            [readonly]="props.readonly === true"
            [decimals]="props.decimals ?? 0"
            [format]="props.format ?? 'n0'"
            [spinners]="props.spinners ?? true"
            (valueChange)="onValueChange(field, $event)"
        >
        </kendo-numerictextbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldNumericTextbox extends FieldType<FieldTypeConfig<NumericTextboxProps>> {
    onValueChange(field: FieldTypeConfig<NumericTextboxProps>, value: any) {
        if (field.props.nullable !== true && (value === null || value === undefined)) 
            field.formControl.setValue(0);

        if(field.props.change)
            field.props.change(field, value)
    }
}
