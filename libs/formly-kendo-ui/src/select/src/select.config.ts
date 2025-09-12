import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldSelect } from './select.type';

export function withFormlyFieldSelect(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-select',
        component: FormlyFieldSelect,
        wrappers: ['kendo-form-field-horizontal'],
        defaultOptions: {
            props: {
                labelProp: 'label',
                valueProp: 'value'
            },
        },
      },
      { name: 'enum', extends: 'select' },
    ],
  };
}
