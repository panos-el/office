import { Component, ChangeDetectionStrategy, Type, inject } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FieldType, FormlyModule } from '@ngx-formly/core';
import { InputSize, KENDO_SWITCH } from '@progress/kendo-angular-inputs';
import { PrimeNG } from 'primeng/config';
import { BaseFormlyFieldProps } from '../../form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface SwitchProps extends BaseFormlyFieldProps {
    size?: InputSize;
    style?: string;
    labelOn?: string;
    labelOff?: string;
}

export interface FormlySwitchFieldConfig extends FormlyFieldConfig<SwitchProps> {
    type: 'kendo-switch' | Type<FormlyFieldSwitch>;
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_SWITCH],
    selector: 'formly-field-kendo-switch',
    template: `
    <kendo-switch
        [formControl]="formControl"
        [formlyAttributes]="field"
        [readonly]="props.readonly === true"
        [style]="props.style || style"
        [size]="props.size || 'small'"
        [onLabel]="props.labelOn || labelOn"
        [offLabel]="props.labelOff || labelOff">
      </kendo-switch>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldSwitch extends FieldType<FieldTypeConfig<SwitchProps>> {    
    primeng = inject(PrimeNG);

    public style: string = "width: 60px;height: 30.3px;";
    public labelOn: string = this.primeng.getTranslation("common.yes");
    public labelOff: string= this.primeng.getTranslation("common.no");
}
