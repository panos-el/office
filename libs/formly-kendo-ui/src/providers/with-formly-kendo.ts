import { Provider, makeEnvironmentProviders } from '@angular/core';
import { provideFormlyCore } from '@ngx-formly/core';

// NEVER import from '@office/formly-kendo-ui' inside this lib
// Use only relative imports to files in this lib:
import { FormlyFieldCheckbox }  from '../checkbox/src/checkbox.type';
import { FormlyFieldInput }     from '../input/src/input.type';
import { FormlyFieldRadio }     from '../radio/src/radio.type';
import { FormlyFieldSelect }    from '../select/src/select.type';
import { FormlyFieldTextArea }  from '../textarea/src/textarea.type';
import { FormlyFieldTextBox }   from '../textbox/src/textbox.type';
import { FormlyWrapperFormField } from '../form-field/src/form-field.wrapper';

export function withFormlyKendo(): Provider[] {
  return [
    provideFormlyCore({
      types: [
        { name: 'kendo-checkbox',  component: FormlyFieldCheckbox },
        { name: 'kendo-input',     component: FormlyFieldInput },
        { name: 'kendo-radio',     component: FormlyFieldRadio },
        { name: 'kendo-select',    component: FormlyFieldSelect },
        { name: 'kendo-textarea',  component: FormlyFieldTextArea },
        { name: 'kendo-textbox',   component: FormlyFieldTextBox },
      ],
      wrappers: [
        { name: 'kendo-form-field', component: FormlyWrapperFormField },
      ],
    }),
  ];
}

export function provideFormlyKendo() {
  return makeEnvironmentProviders(withFormlyKendo());
}
