import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent, KENDO_FORMFIELD, ResponsiveFormBreakPoint } from '@progress/kendo-angular-inputs';
import { ɵdefineHiddenProp as defineHiddenProp, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { BaseFormlyFieldProps } from './base-formly-field-props';

@Component({
    imports: [CommonModule, ReactiveFormsModule, KENDO_FORMFIELD ],
    selector: 'formly-wrapper-kendo-formfield',
    template: `
        <kendo-formfield [colSpan]="props.colSpan || 2" [ngClass]="{ 'k-ff-vertical': props.orientation === 'vertical' }">
            @if (props.label && props.hideLabel !== true) {
                <label [for]="id" class="k-form-label">
                    {{ props.label }}
                    @if (props.required && props.hideRequiredMarker !== true) {
                        <span aria-hidden="true" class="k-required">*</span>
                    }
                    @if (props.markAsRequired === true) {
                        <span aria-hidden="true" class="k-required">*</span>
                    }
                </label>
            }

            <ng-container #fieldComponent></ng-container>
        </kendo-formfield>
    `
})
export class FormlyWrapperFormField extends FieldWrapper<FormlyFieldConfig<BaseFormlyFieldProps>> implements OnInit {
    @ViewChild(FormFieldComponent, { static: true }) formfield!: FormFieldComponent;

    public formFieldColSpans: ResponsiveFormBreakPoint[] = [
        { minWidth: 576, value: 1 },
        { maxWidth: 575, value: 2 },
    ];

    ngOnInit() {
        defineHiddenProp(this.field, '_formField', this.formfield);
        defineHiddenProp(this.formfield, 'formControls', undefined);
        this.formfield['showErrorsInitial'] = () => this.showError;
        this.formfield['showHintsInitial'] = () => !this.showError;

        const disabledElement = this.formfield['disabledElement'].bind(this);
        this.formfield['disabledElement'] = () => {
            if (this.formfield.controlElementRefs.length === 0) {
                return false;
            }

            return disabledElement();
        };
    }
}
