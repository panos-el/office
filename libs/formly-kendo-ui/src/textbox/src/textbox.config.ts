import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldTextBox } from './textbox.type';

export function withFormlyFieldTextBox(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-textbox',
        component: FormlyFieldTextBox,
        wrappers: ['wrapper-kendo-formfield'],
      },
    ],
  };
}
