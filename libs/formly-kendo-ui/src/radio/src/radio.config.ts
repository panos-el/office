import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldRadio } from './radio.type';

export function withFormlyFieldRadio(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-radio',
        component: FormlyFieldRadio,
        wrappers: ['kendo-form-field-horizontal'],
      },
    ],
  };
}
