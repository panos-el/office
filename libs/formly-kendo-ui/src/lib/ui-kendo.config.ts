import { withFormlyFormField } from '../../form-field';
import { withFormlyFieldCheckbox } from '../../checkbox';

export function withFormlyKendo() {
  return [
    withFormlyFormField(),
    withFormlyFieldCheckbox(),
  ];
}
