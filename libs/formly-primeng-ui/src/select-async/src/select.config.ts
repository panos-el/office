import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldSelectAsync } from './select.type';

export function withFormlyFieldSelectAsync(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-select-async',
        component: FormlyFieldSelectAsync,
        wrappers: ['form-field-horizontal'],
      }
    ],
  };
}
