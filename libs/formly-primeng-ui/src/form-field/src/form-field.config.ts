import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperFormField } from './form-field.wrapper';
import { FormlyWrapperPanel } from './panel.wrapper';
import { FormlyWrapperHorizontalField } from './horizontal-field.wrapper';
import { FormlyWrapperVerticalField } from './vertical-field.wrapper';

export function withFormlyFormField(): ConfigOption {
  return {
    wrappers: [
      {
        name: 'form-field',
        component: FormlyWrapperFormField,
      },
      {
        name: 'form-field-horizontal',
        component: FormlyWrapperHorizontalField,
      },
      {
        name: 'form-field-vertical',
        component: FormlyWrapperVerticalField,
      },
      {
        name: 'wrapper-panel',
        component: FormlyWrapperPanel,
      },
    ],
  };
}
