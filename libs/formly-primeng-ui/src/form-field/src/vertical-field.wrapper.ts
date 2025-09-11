import { Component } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';

export interface VerticalFormlyFieldProps extends FormlyFieldProps {
  hideRequiredMarker?: boolean;
  hideLabel?: boolean;
}

@Component({
  standalone: false,
  selector: 'formly-wrapper-vertical-field',
  template: `
    <div>
      <label *ngIf="props.label && props.hideLabel !== true" [for]="id" class="block text-base font-medium text-gray-700">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true" class="k-required" style="color: red;">*</span>
      </label>
      <div class="mt-1 w-full">
        <ng-container #fieldComponent></ng-container>
      </div>

    </div>
  `,
})
export class FormlyWrapperVerticalField extends FieldWrapper<FormlyFieldConfig<VerticalFormlyFieldProps>> {
}
