import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { saveIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';

interface ButtonTextBoxProps extends BaseFormlyFieldProps {
    onClick?: (field: any) => void;
    showButton?: (field: any, model: any) => boolean;
    svgIcon?: SVGIcon;
}

export interface FormlyButtonTextBoxFieldConfig extends FormlyFieldConfig<ButtonTextBoxProps> {
    type: 'kendo-button-textbox' | Type<FormlyFieldButtonTextBox>;
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, KENDO_TEXTBOX, KENDO_BUTTON],
    selector: 'formly-field-kendo-button-textbox',
    template: ` 
    <kendo-textbox [formControl]="formControl" [formlyAttributes]="field" [placeholder]="props.placeholder || ''">
        @if (buttonEnable === true) {
        <ng-template kendoTextBoxSuffixTemplate>
            <button kendoButton
                [svgIcon]="props.svgIcon || saveIcon"
                [disabled]="(props.disabled === true) || (props.readonly === true) || (disabled === true)"
                (click)="props.onClick && props.onClick(field)">
            </button>
        </ng-template>
        }
    </kendo-textbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldButtonTextBox extends FieldType<FieldTypeConfig<ButtonTextBoxProps>> {
    saveIcon: SVGIcon = saveIcon;
    disabled: boolean = false;

    get buttonEnable(): boolean | Promise<boolean> {
        if (this.props.showButton) {
            return this.props.showButton(this.field, this.model);
        }
        return true;
    }
    
}
