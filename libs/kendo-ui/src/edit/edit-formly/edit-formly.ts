import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from "@ngx-formly/core";
import { Gutters, KENDO_INPUTS, Orientation, ResponsiveFormBreakPoint } from "@progress/kendo-angular-inputs";

@Component({
    selector: 'kendo-edit-formly',
    templateUrl: './edit-formly.html',
    imports: [CommonModule, ReactiveFormsModule, FormlyForm, KENDO_INPUTS]
})
export class KendoEditFormlyComponent {

    @Input() classes: any;
    
    @Input() form!: UntypedFormGroup;
    @Input() model: any;
    @Input() options!: FormlyFormOptions;
    @Input() fields!: FormlyFieldConfig[];

    @Input() orientation: Orientation = 'horizontal';
    @Input() gutters: string | number | Gutters | ResponsiveFormBreakPoint[] = { cols: 32, rows: 32};
    @Input() cols: number = 2;
}