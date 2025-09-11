import { Component } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';

export interface HorizontalFormlyFieldProps extends FormlyFieldProps {
  hideRequiredMarker?: boolean;
  hideLabel?: boolean;
}

@Component({
  standalone: false,
  selector: 'formly-wrapper-horizontal-field',
  template: `
    <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
      <label *ngIf="props.label && props.hideLabel !== true" [for]="id" class="w-full md:w-1/4 text-base font-medium text-gray-700">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true" class="k-required" style="color: red;">*</span>
      </label>
      <div class="mt-1 md:mt-0 w-full md:w-3/4 py-2">
        <ng-container #fieldComponent></ng-container>
      </div>

    </div>
  `,
})
export class FormlyWrapperHorizontalField extends FieldWrapper<FormlyFieldConfig<HorizontalFormlyFieldProps>> {
}
