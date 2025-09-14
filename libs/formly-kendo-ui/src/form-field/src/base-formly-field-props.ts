import { FormlyFieldProps } from "@ngx-formly/core";
import { Orientation, ResponsiveFormBreakPoint } from "@progress/kendo-angular-inputs";

export interface BaseFormlyFieldProps extends FormlyFieldProps {
  hideRequiredMarker?: boolean;
  hideLabel?: boolean;
  markAsRequired?: boolean;
  orientation?: Orientation;
  colSpan?: number | ResponsiveFormBreakPoint[]
}
