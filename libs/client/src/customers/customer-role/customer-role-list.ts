import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'customer-role-list',
  templateUrl: './customer-role-list.html',
})
export class CustomerRoleListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/customerRole/list',
      dataSourceUrl: 'api/customerRole/list',
      deleteUrl: 'api/customerRole/delete',
      // deleteSelectedUrl: 'api/customerRole/deleteSelected',
      pathUrl: 'client/customer-role'
    };
}
