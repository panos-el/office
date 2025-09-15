import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldDatepicker } from './datepicker.type';

export function withFormlyFieldDatepicker(): ConfigOption {
  return {
    types: [
      {
        name: 'kendo-datepicker',
        component: FormlyFieldDatepicker,
        wrappers: ['wrapper-kendo-formfield'],
      },
      {
        name: 'kendo-datepicker-year',
        extends: 'kendo-datepicker',
        defaultOptions: {
          props: {
            bottomView: "decade",
            format: {
              displayFormat: { year: 'numeric' },
              inputFormat: { year: 'numeric' },
            }
          },
        },
      },
      {
        name: 'kendo-datepicker-mobth',
        extends: 'kendo-datepicker',
        defaultOptions: {
          props: {
            bottomView: "year",
            format: {
              displayFormat: { month: 'short' },
              inputFormat: { month: 'numeric' },
            }
          },
        },
      },
      {
        name: 'kendo-datepicker-year-month',
        extends: 'kendo-datepicker',
        defaultOptions: {
          props: {
            bottomView: "year",
            format: {
              displayFormat: { year: 'numeric', month: 'short' },
              inputFormat: { year: 'numeric', month: 'numeric' },
            }
          },
        },
      },
    ]
  };
}
