import { CommonModule } from '@angular/common';
import { Component, inject, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { BASE_URL, ClientDataService, ListFormOptions, LocalizationService } from '@office/core';
import { KendoRemoteGridComponent, IGridToken, GRID_TOKEN } from '@office/kendo-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'currency-list',
  imports: [CommonModule, ReactiveFormsModule, KENDO_BUTTONS, KendoRemoteGridComponent],
  templateUrl: './currency-list.component.html',
})
export class CurrencyListComponent {
    @ViewChild('grid', { read: GRID_TOKEN }) grid!: IGridToken;
    
    options: ListFormOptions = {
      propertiesUrl: 'api/currency/list',
      dataSourceUrl: 'api/currency/list',
      deleteUrl: 'api/currency/delete',
      // deleteSelectedUrl: 'api/currency/deleteSelected',
      pathUrl: 'client/currency'
    };

    public loading = false;
    public markLabel: string;

    baseUrl = inject(BASE_URL);

    constructor(
        private dataService: ClientDataService,
        private toastrService: ToastrService,
        private localizationService: LocalizationService) {
        this.markLabel = localizationService.translate("common.mark");
    }

    private mark(url: string, id: any) {
      this.loading = true;
      this.dataService
        .fetchJsonBodyPost(url, {}, { id })
        .then(() => {
          this.grid.reloadData().then(() => {
            this.grid.clearSelectedKeys();
            this.toastrService.success(this.localizationService.translate('messages.editSuccessfullyCompleted'));
          });
        })
        .catch((error: Error) => {
          Promise.reject(error);
        })
        .finally(() => (this.loading = false));
    }

    exchangeRate(item: any) {
      const url = `${this.baseUrl}api/currency/markAsPrimaryExchangeRateCurrency`;

      this.mark(url, item.id);
    }

    storeCurrency(item: any) {
      const url = `${this.baseUrl}api/currency/markAsPrimaryStoreCurrency`;

      this.mark(url, item.id);
    }
}
