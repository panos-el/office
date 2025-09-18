import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'message-template-list',
  templateUrl: './message-template-list.html',
})
export class MessageTemplateListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/messageTemplate/list',
      dataSourceUrl: 'api/messageTemplate/list',
      deleteUrl: 'api/messageTemplate/delete',
      // deleteSelectedUrl: 'api/messageTemplate/deleteSelected',
      pathUrl: 'client/message-template'
    };
}
