import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldSwitch } from './switch.type';

export function withFormlyFieldSwitch(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-switch',
        component: FormlyFieldSwitch,
        wrappers: ['wrapper-kendo-formfield'],
      },
    ],
  };
}
