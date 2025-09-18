import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldButtonTextBox } from './button-textbox.type';

export function withFormlyFieldButtonTextBox(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-button-textbox',
        component: FormlyFieldButtonTextBox,
        wrappers: ['wrapper-kendo-formfield'],
      },
    ],
  };
}
