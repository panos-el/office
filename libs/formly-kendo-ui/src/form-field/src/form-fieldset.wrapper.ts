import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Gutters, KENDO_INPUTS, ResponsiveFormBreakPoint } from '@progress/kendo-angular-inputs';
import { FieldWrapper, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';

interface FieldsetProps extends FormlyFieldProps {
    fsCols?: number | ResponsiveFormBreakPoint[];
    colSpan?: number | ResponsiveFormBreakPoint[];
    gutters?: string | number | Gutters | ResponsiveFormBreakPoint[];
    legend?: string;
    fsClass?: string;
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, KENDO_INPUTS],
    selector: 'formly-wrapper-kendo-fieldset',
    template: `
        <fieldset kendoFormFieldSet 
                  [legend]="props.legend || ''" 
                  [cols]="props.cols || 2" 
                  [colSpan]="props.colSpan || formFieldColSpans" 
                  [gutters]="props.gutters || gutters" 
                  [ngClass]="props.fsClass">

            <ng-container #fieldComponent></ng-container>

        </fieldset>
    `
})
export class FormlyWrapperFieldset extends FieldWrapper<FormlyFieldConfig<FieldsetProps>> {
    public formFieldColSpans: ResponsiveFormBreakPoint[] = [
        { minWidth: 768, value: 1 },
        { maxWidth: 767, value: 2 },
    ];
    public gutters: Gutters = {
      cols: 16,
      rows: 0
};
}
