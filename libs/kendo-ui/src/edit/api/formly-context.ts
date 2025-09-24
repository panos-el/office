import { UntypedFormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

export interface FormlyContext {
    form: UntypedFormGroup;
    model: any;
    options: FormlyFormOptions;
    fields: FormlyFieldConfig[];
}