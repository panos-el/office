import { Component, ViewChild, OnInit } from '@angular/core';
import { FormFieldComponent, Orientation } from '@progress/kendo-angular-inputs';
import {
  ɵdefineHiddenProp as defineHiddenProp,
  FieldWrapper, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';

export interface BaseFormlyFieldProps extends FormlyFieldProps {
  hideRequiredMarker?: boolean;
  hideLabel?: boolean;
  orientation?: Orientation;
  markAsRequired?: boolean;
}

@Component({
  standalone: false,
  selector: 'formly-wrapper-kendo-form-field',
  template: `
    <kendo-formfield [orientation]="props.orientation || 'horizontal'">
      <label *ngIf="props.label && props.hideLabel !== true" [for]="id">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true" class="k-required">*</span>
      </label>

      <ng-container #fieldComponent></ng-container>

    </kendo-formfield>
  `,
})
export class FormlyWrapperFormField extends FieldWrapper<FormlyFieldConfig<BaseFormlyFieldProps>> implements OnInit {
  @ViewChild(FormFieldComponent, { static: true }) formfield!: FormFieldComponent;

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
