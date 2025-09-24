import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldMulticolumncombobox } from './multicolumncombobox.type';

export function withFormlyFieldMulticolumncombobox(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-multicolumncombobox',
        component: FormlyFieldMulticolumncombobox,
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
