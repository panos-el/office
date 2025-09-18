import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldMultiselect } from './multiselect.type';

export function withFormlyFieldMultiselect(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-multiselect',
        component: FormlyFieldMultiselect,
        wrappers: ['wrapper-kendo-formfield'],
        defaultOptions: {
            props: {
                labelProp: 'label',
                valueProp: 'value',
                options: []
            },
        },
      },
    ],
  };
}