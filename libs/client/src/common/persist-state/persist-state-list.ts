import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'persist-state-list',
  templateUrl: './persist-state-list.html',
})
export class PersistStateListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/persistState/list',
      dataSourceUrl: 'api/persistState/list',
      deleteUrl: 'api/persistState/delete',
      // deleteSelectedUrl: 'api/persistState/deleteSelected',
      pathUrl: 'client/persist-state'
    };
}
