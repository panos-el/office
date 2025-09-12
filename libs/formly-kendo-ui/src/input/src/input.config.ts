import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldInput } from './input.type';

export function withFormlyFieldInput(): ConfigOption {
  return {
    types: [
      {
        name: 'input',
        component: FormlyFieldInput,
        wrappers: ['kendo-form-field-horizontal'],
      },
      { name: 'string', extends: 'input' },
      {
        name: 'number',
        extends: 'input',
        defaultOptions: {
          props: {
            type: 'number',
          },
        },
      },
      {
        name: 'integer',
        extends: 'input',
        defaultOptions: {
          props: {
            type: 'number',
          },
        },
      },
    ],
  };
}
