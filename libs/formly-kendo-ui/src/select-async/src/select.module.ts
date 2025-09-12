import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormlySelectModule as FormlyCoreSelectModule } from '@ngx-formly/core/select';

import { FormlyFormFieldModule } from '../../form-field';
import { FormlyFieldSelectAsync } from './select.type';
import { withFormlyFieldSelectAsync } from './select.config';

@NgModule({
  declarations: [FormlyFieldSelectAsync],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropDownsModule,

    FormlyFormFieldModule,
    FormlyCoreSelectModule,
    FormlyModule.forChild(withFormlyFieldSelectAsync()),
  ],
})
export class FormlySelectAsyncModule {}
