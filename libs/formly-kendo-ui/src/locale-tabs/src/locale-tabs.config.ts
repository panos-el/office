import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldLocaleTabs } from './locale-tabs.type';

export function withFormlyFieldLocaleTabs(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-locale-tabs',
        component: FormlyFieldLocaleTabs,
        wrappers: ['wrapper-kendo-formfield'],
      }
    ]
  };
}
