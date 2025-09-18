// grid-token.ts
import { InjectionToken } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

export interface IEditFormToken {
    form: UntypedFormGroup;
    model: any;
    options: FormlyFormOptions;
    fields: FormlyFieldConfig[];
}

// Create a custom injection token for the grid component.
export const EDIT_FORM_TOKEN = new InjectionToken<IEditFormToken>('EditFormToken');
