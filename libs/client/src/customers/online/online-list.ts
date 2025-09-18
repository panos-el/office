import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'online-list',
  templateUrl: './online-list.html',
})
export class OnlineListComponent {
    options: ListFormOptions = {
      propertiesUrl: 'api/onlineCustomer/list',
      dataSourceUrl: 'api/onlineCustomer/list',
      // deleteUrl: 'api/onlineCustomer/delete',
      // deleteSelectedUrl: 'api/onlineCustomer/deleteSelected',
      pathUrl: 'client/online-users'
    };
}