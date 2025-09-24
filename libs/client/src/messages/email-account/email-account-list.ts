import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, ClientDataService, ListFormOptions, LocalizationService } from '@office/core';
import { KendoRemoteGridComponent, KendoGridToken } from '@office/kendo-ui';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent, KENDO_BUTTON],
  selector: 'email-account-list',
  templateUrl: './email-account-list.html',
})
export class EmailAccountListComponent implements OnInit {
    @ViewChild(KendoGridToken) grid!: KendoGridToken;
    
    options: ListFormOptions = {
      propertiesUrl: 'api/emailAccount/list',
      dataSourceUrl: 'api/emailAccount/list',
      deleteUrl: 'api/emailAccount/delete',
      // deleteSelectedUrl: 'api/emailAccount/deleteSelected',
      pathUrl: 'client/email-account'
    };
    
    public loading = false;
    public markLabel!: string;

    baseUrl = inject(BASE_URL);

    constructor(
        private dataService: ClientDataService,
        private localizationService: LocalizationService,
        private toastrService: ToastrService) {
    }

    ngOnInit(): void {
        this.markLabel = this.localizationService.translate("common.mark");
    }

    markAsDefaultEmail(item: any) {
        const url = `${this.baseUrl}api/emailAccount/markAsDefaultEmail`;

        this.loading = true;
        this.dataService.fetchJsonBodyPost(url, {}, { id: item.id })
            .then(() => {
                this.grid.reloadData().then(() => {
                    this.toastrService.success(this.localizationService.translate('messages.editSuccessfullyCompleted'));
                });
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.loading = false);
    }
}
