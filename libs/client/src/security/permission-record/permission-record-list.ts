import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'permission-record-list',
  templateUrl: './permission-record-list.html',
})
export class PermissionRecordListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/permissionRecord/list',
      dataSourceUrl: 'api/permissionRecord/list',
      deleteUrl: 'api/permissionRecord/delete',
      // deleteSelectedUrl: 'api/permissionRecord/deleteSelected',
      pathUrl: 'client/permission-record'
    };
}
