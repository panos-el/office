import { withFormlyFieldAutocomplete } from '../autocomplete';
import { withFormlyFieldCheckbox } from '../checkbox';
import { withFormlyFieldDatepicker } from '../datepicker';
import { withFormlyFormField } from '../form-field';
import { withFormlyFieldInput } from '../input';
import { withFormlyFieldLocaleTabs } from '../locale-tabs';
import { withFormlyFieldNumericTextbox } from '../numeric';
import { withFormlyFieldRadio } from '../radio';
import { withFormlyFieldSelect } from '../select';
import { withFormlyFieldSelectAsync } from '../select-async';
import { withFormlyFieldSwitch } from '../switch';
import { withFormlyFieldTextBox } from '../textbox';
import { withFormlyFieldTextArea } from '../textarea';

export function withFormlyKendo() {
  return [
    withFormlyFieldAutocomplete(),
    withFormlyFieldCheckbox(),
    withFormlyFieldDatepicker(),
    withFormlyFormField(),
    withFormlyFieldInput(),
    withFormlyFieldLocaleTabs(),
    withFormlyFieldNumericTextbox(),
    withFormlyFieldRadio(),
    withFormlyFieldSelect(),
    withFormlyFieldSelectAsync(),
    withFormlyFieldSwitch(),
    withFormlyFieldTextBox(),
    withFormlyFieldTextArea(),
  ];
}
