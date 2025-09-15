import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldNumericTextbox } from './numeric.type';

export function withFormlyFieldNumericTextbox(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-numerictextbox',
        component: FormlyFieldNumericTextbox,
        wrappers: ['wrapper-kendo-formfield'],
      },
      {
        name: 'kendo-decimals',
        extends: 'kendo-numerictextbox',
        defaultOptions: {
          props: {
            decimals: 2,
            format: "n2"
          },
        },
      },
    ]
  };
}
