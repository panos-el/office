import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'store-list',
  templateUrl: './store-list.html',
})
export class StoreListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/store/list',
      dataSourceUrl: 'api/store/list',
      deleteUrl: 'api/store/delete',
      // deleteSelectedUrl: 'api/store/deleteSelected',
      pathUrl: 'client/store'
    };
}
