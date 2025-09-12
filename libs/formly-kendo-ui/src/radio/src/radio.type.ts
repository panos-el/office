import { Component, ChangeDetectionStrategy, ViewEncapsulation, Type } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';

interface RadioProps extends BaseFormlyFieldProps {}

export interface FormlyRadioFieldConfig extends FormlyFieldConfig<RadioProps> {
  type: 'kendo-radio' | Type<FormlyFieldRadio>;
}

@Component({
  standalone: false,
  selector: 'formly-field-kendo-radio',
  template: `
    <ng-container *ngFor="let option of props.options | formlySelectOptions: field | async; let i = index">
      <input
        type="radio"
        #radioInput
        kendoRadioButton
        [id]="id + '_' + i"
        [name]="field.name || id"
        [value]="option.value"
        [formControl]="option.disabled ? disabledControl : formControl"
        [formlyAttributes]="field"
      />
      <label class="k-radio-label" [for]="id + '_' + i">
        {{ option.label }}
      </label>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./radio.type.scss'],
})
export class FormlyFieldRadio extends FieldType<FieldTypeConfig<RadioProps>> {
  get disabledControl() {
    return new UntypedFormControl({ value: this.formControl.value, disabled: true });
  }
}
