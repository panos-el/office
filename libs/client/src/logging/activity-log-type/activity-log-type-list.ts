import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  selector: 'activity-log-type-list',
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
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