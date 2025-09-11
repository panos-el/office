import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  standalone: false,
  selector: 'formly-wrapper-panel',
  template: `        
    <div class="col-span-12 md:col-span-6">
        <div class="card h--full">
          <ng-container #fieldComponent></ng-container>            
        </div>
    </div>    
  `,
})
export class FormlyWrapperPanel extends FieldWrapper { }
