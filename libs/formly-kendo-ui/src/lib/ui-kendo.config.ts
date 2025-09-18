import { withFormlyFieldAutocomplete } from '../autocomplete';
import { withFormlyFieldButtonTextBox } from '../button-textbox';
import { withFormlyFieldCheckbox } from '../checkbox';
import { withFormlyFieldDatepicker } from '../datepicker';
import { withFormlyFormField } from '../form-field';
import { withFormlyFieldInput } from '../input';
import { withFormlyFieldLocaleTabs } from '../locale-tabs';
import { withFormlyFieldMultiselect } from '../multiselect';
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
    withFormlyFieldButtonTextBox(),
    withFormlyFieldCheckbox(),
    withFormlyFieldDatepicker(),
    withFormlyFormField(),
    withFormlyFieldInput(),
    withFormlyFieldLocaleTabs(),
    withFormlyFieldMultiselect(),
    withFormlyFieldNumericTextbox(),
    withFormlyFieldRadio(),
    withFormlyFieldSelect(),
    withFormlyFieldSelectAsync(),
    withFormlyFieldSwitch(),
    withFormlyFieldTextBox(),
    withFormlyFieldTextArea(),
  ];
}
