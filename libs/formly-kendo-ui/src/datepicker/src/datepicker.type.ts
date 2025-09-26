import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { CalendarView, FormatSettings, KENDO_DATEPICKER } from '@progress/kendo-angular-dateinputs';
import { BaseFormlyFieldProps } from '../../form-field';

interface DatepickerProps extends BaseFormlyFieldProps {
    format?: string | FormatSettings;
    navigation?: boolean;
    bottomView?: CalendarView;
    minDate?: Date;
    maxDate?: Date;
}

export interface FormlyDatepickerFieldConfig extends FormlyFieldConfig<DatepickerProps> {
    type: 'kendo-datepicker' | Type<FormlyFieldDatepicker>;
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_DATEPICKER ],
    selector: "formly-field-kendo-datepicker",
    template: `
    <kendo-datepicker 
        [formControl]="formControl" 
        [formlyAttributes]="field"
        [readonly]="props.readonly === true"
        [format]="props.format ?? format"
        [navigation]="props.navigation ?? false"
        [bottomView]="props.bottomView ?? 'month'"
        (valueChange)="props.change && props.change(field, $event)">
    </kendo-datepicker>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldDatepicker extends FieldType<FieldTypeConfig<DatepickerProps>> {
    public format: FormatSettings = {
              displayFormat: { year: 'numeric', month: '2-digit', day: "2-digit" },
              inputFormat: { year: 'numeric', month: '2-digit', day: "2-digit" },
            };
}
