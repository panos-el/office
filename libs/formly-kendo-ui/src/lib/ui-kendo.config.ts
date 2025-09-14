import { withFormlyFieldAutocomplete } from '../autocomplete';
import { withFormlyFieldCheckbox } from '../checkbox';
import { withFormlyFormField } from '../form-field';
import { withFormlyFieldInput } from '../input';
import { withFormlyFieldLocaleTabs } from '../locale-tabs';
import { withFormlyFieldRadio } from '../radio';
import { withFormlyFieldSelect } from '../select';
import { withFormlyFieldSelectAsync } from '../select-async';
import { withFormlyFieldTextBox } from '../textbox';
import { withFormlyFieldTextArea } from '../textarea';

export function withFormlyKendo() {
  return [
    withFormlyFieldAutocomplete(),
    withFormlyFieldCheckbox(),
    withFormlyFormField(),
    withFormlyFieldInput(),
    withFormlyFieldLocaleTabs(),
    withFormlyFieldRadio(),
    withFormlyFieldSelect(),
    withFormlyFieldSelectAsync(),
    withFormlyFieldTextBox(),
    withFormlyFieldTextArea(),
  ];
}
