import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  selector: 'activity-log-list',
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  templateUrl: './activity-log-list.html',
})
export class ActivityLogListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/activityLog/list',
      dataSourceUrl: 'api/activityLog/list',
      deleteUrl: 'api/activityLog/delete',
      deleteSelectedUrl: 'api/activityLog/deleteSelected',
      pathUrl: 'client/activity-log'
    };
}
