import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperFormField } from './form-field.wrapper';
import { FormlyWrapperFieldset } from './form-fieldset.wrapper';

export function withFormlyFormField(): ConfigOption {
  
  return {
    wrappers: [
      {
        name: 'wrapper-kendo-formfield',
        component: FormlyWrapperFormField,
      },
      {
        name: 'wrapper-kendo-fieldset',
        component: FormlyWrapperFieldset,
      }
    ],
  };
}
