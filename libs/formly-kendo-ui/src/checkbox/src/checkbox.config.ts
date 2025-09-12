import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldCheckbox } from './checkbox.type';

export function withFormlyFieldCheckbox(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-checkbox',
        component: FormlyFieldCheckbox,
        wrappers: ['form-field-horizontal'],
      },
      {
        name: 'boolean',
        extends: 'checkbox',
      },
    ],
  };
}
