import { withFormlyFormField } from '../form-field';
import { withFormlyFieldInput } from '../input';
import { withFormlyFieldTextArea } from '../textarea';
import { withFormlyFieldRadio } from '../radio';
import { withFormlyFieldCheckbox } from '../checkbox';
import { withFormlyFieldSelect } from '../select';
import { withFormlyFieldSelectAsync } from '../select-async';
import { withFormlyFieldTextBox } from '../textbox';

export function withFormlyKendo() {
  return [
    withFormlyFieldCheckbox(),
    withFormlyFormField(),
    withFormlyFieldInput(),
    withFormlyFieldRadio(),
    withFormlyFieldSelect(),
    withFormlyFieldSelectAsync(),
    withFormlyFieldTextBox(),
    withFormlyFieldTextArea(),
  ];
}
