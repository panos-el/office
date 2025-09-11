import { NgModule } from '@angular/core';
import { FormlyFormFieldModule } from '../form-field';
import { FormlyInputModule } from '../input';
import { FormlyTextAreaModule } from '../textarea';
import { FormlyRadioModule } from '../radio';
import { FormlyCheckboxModule } from '../checkbox';
import { FormlySelectModule } from '../select';
import { FormlySelectAsyncModule } from '../select-async';
import { FormlyTextBoxModule } from '../textbox';

@NgModule({
  imports: [
    FormlyCheckboxModule,
    FormlyFormFieldModule,
    FormlyInputModule,
    FormlyRadioModule,
    FormlySelectModule,
    FormlySelectAsyncModule,
    FormlyTextBoxModule,
    FormlyTextAreaModule
  ],
})
export class FormlyKendoModule {}
