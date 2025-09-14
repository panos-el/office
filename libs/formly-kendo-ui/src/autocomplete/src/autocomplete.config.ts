import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldAutocomplete } from './autocomplete.type';

export function withFormlyFieldAutocomplete(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-autocomplete',
        component: FormlyFieldAutocomplete,
        wrappers: ['wrapper-kendo-formfield'],
        defaultOptions: {
            props: {
                data: []
            },
        },
      },
    ],
  };
}
