import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'queued-email-list',
  templateUrl: './queued-email-list.html',
})
export class QueuedEmailListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/queuedEmail/list',
      dataSourceUrl: 'api/queuedEmail/list',
      deleteUrl: 'api/queuedEmail/delete',
      // deleteSelectedUrl: 'api/country/deleteSelected',
      pathUrl: 'client/queued-email'
    };
}
