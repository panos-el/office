import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldSelect } from './select.type';

export function withFormlyFieldSelect(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-select',
        component: FormlyFieldSelect,
        wrappers: ['wrapper-kendo-formfield'],
        defaultOptions: {
            props: {
                labelProp: 'label',
                valueProp: 'value'
            },
        },
      },
    ],
  };
}
