import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_NUMERICTEXTBOX, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';

interface InputProps extends BaseFormlyFieldProps {}

export interface FormlyInputFieldConfig extends FormlyFieldConfig<InputProps> {
  type: 'input' | Type<FormlyFieldInput>
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_TEXTBOX, KENDO_NUMERICTEXTBOX],
  selector: 'formly-field-kendo-input',
  template: `
    <input
      *ngIf="props.type !== 'number'; else numberTmp"
      kendoTextBox
      [type]="props.type || 'text'"
      [formlyAttributes]="field"
      [formControl]="formControl"
    />
    <ng-template #numberTmp>
      <kendo-numerictextbox [formlyAttributes]="field" [formControl]="formControl"> </kendo-numerictextbox>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldInput extends FieldType<FieldTypeConfig<InputProps>> {}
