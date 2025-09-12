import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperFormField } from './form-field.wrapper';
import { FormlyWrapperHorizontalField } from './horizontal-field.wrapper';
import { FormlyWrapperVerticalField } from './vertical-field.wrapper';

export function withFormlyFormField(): ConfigOption {
  return {
    wrappers: [
      {
        name: 'kendo-form-field',
        component: FormlyWrapperFormField,
      },
      {
        name: 'kendo-form-field-horizontal',
        component: FormlyWrapperHorizontalField,
      },
      {
        name: 'kendo-form-field-vertical',
        component: FormlyWrapperVerticalField,
      },
    ],
  };
}
