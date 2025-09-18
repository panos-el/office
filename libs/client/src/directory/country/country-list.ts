import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormOptions } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'country-list',
  templateUrl: './country-list.html',
})
export class CountryListComponent {    
    options: ListFormOptions = {
      propertiesUrl: 'api/country/list',
      dataSourceUrl: 'api/country/list',
      deleteUrl: 'api/country/delete',
      // deleteSelectedUrl: 'api/country/deleteSelected',
      pathUrl: 'client/country'
    };
}
