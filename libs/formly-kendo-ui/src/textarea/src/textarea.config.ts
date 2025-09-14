import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldTextArea } from './textarea.type';

export function withFormlyFieldTextArea(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-textarea',
        component: FormlyFieldTextArea,
        wrappers: ['wrapper-kendo-formfield'],
      },
    ],
  };
}
