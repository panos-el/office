// edit-form-token.ts
// import { InjectionToken } from '@angular/core';
// import { UntypedFormGroup } from '@angular/forms';
// import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';

// export interface IEditFormToken {
//     form: UntypedFormGroup;
//     model: any;
//     options: FormlyFormOptions;
//     fields: FormlyFieldConfig[];
// }

// export const EDIT_FORM_TOKEN = new InjectionToken<IEditFormToken>('IEditFormToken');

export abstract class EditFormToken {
    // abstract form: UntypedFormGroup;
    // abstract model: any;
    // abstract options: FormlyFormOptions;
    // abstract fields: FormlyFieldConfig[];
    abstract canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

export const SCREEN_SIZE = '(max-width: 576px)';

