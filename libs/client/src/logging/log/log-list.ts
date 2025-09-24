import { CommonModule } from '@angular/common';
import { Component, ContentChild, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, ClientDataService, ListFormOptions, LocalizationService } from '@office/core';
import { KendoGridToken, KendoRemoteGridComponent } from '@office/kendo-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'log-list',
  templateUrl: './log-list.html',
})
export class LogListComponent implements OnInit {    
    @ViewChild(KendoGridToken) grid!: KendoGridToken;
    
    options: ListFormOptions = {
      propertiesUrl: 'api/log/list',
      dataSourceUrl: 'api/log/list',
      deleteUrl: 'api/log/delete',
      deleteSelectedUrl: 'api/log/deleteSelected',
      pathUrl: 'client/log'
    };
    
    customMenuData!: any[];
    public loading = false;

    baseUrl = inject(BASE_URL);

    constructor(
        private dataService: ClientDataService,
        private localizationService: LocalizationService,
        private toastrService: ToastrService) {
    }

    ngOnInit(): void {
        this.customMenuData = [
            { text: this.localizationService.translate('common.actions'), disabled: true, cssClass: "k-group-menu" },
            { text: this.localizationService.translate('common.clearAll'), click: () => this.clearAll() }
        ];
    }

    clearAll() {
        const url = `${this.baseUrl}api/log/clearAll`;

        this.loading = true;
        this.dataService.fetchJsonBodyPost(url, {})
            .then(() => {
                this.grid.reloadData().then(() => {
                    this.grid.clearSelectedKeys();
                    this.toastrService.success(this.localizationService.translate('message.clearAllCompleted'));
                });
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.loading = false);
    }
}