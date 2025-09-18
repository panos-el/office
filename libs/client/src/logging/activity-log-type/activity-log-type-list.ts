import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'activity-log-type-list',
  templateUrl: './activity-log-type-list.html',
})
export class ActivityLogTypeListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/activityLogType/list',
      dataSourceUrl: 'api/activityLogType/list',
      deleteUrl: 'api/activityLogType/delete',
      // deleteSelectedUrl: 'api/activityLogType/deleteSelected',
      pathUrl: 'client/activity-log-type'
    };
}