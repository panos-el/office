import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  selector: 'log-list',
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  templateUrl: './log-list.html',
})
export class LogListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/log/list',
      dataSourceUrl: 'api/log/list',
      deleteUrl: 'api/log/delete',
      deleteSelectedUrl: 'api/log/deleteSelected',
      pathUrl: 'client/log'
    };
}