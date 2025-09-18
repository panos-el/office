import { CommonModule } from '@angular/common';
import { Component, ContentChild, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, ClientDataService, ListFormOptions, LocalizationService } from '@office/core';
import { IKendoGridToken, KENDO_GRID_TOKEN, KendoRemoteGridComponent } from '@office/kendo-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
    imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
    selector: 'activity-log-list',
    templateUrl: './activity-log-list.html'
})
export class ActivityLogListComponent implements OnInit {
    @ViewChild(KENDO_GRID_TOKEN) grid!: IKendoGridToken;

    options: ListFormOptions = {
        propertiesUrl: 'api/activityLog/list',
        dataSourceUrl: 'api/activityLog/list',
        deleteUrl: 'api/activityLog/delete',
        deleteSelectedUrl: 'api/activityLog/deleteSelected',
        pathUrl: 'client/activity-log'
    };

    customMenuData!: any[];
    public loading = false;

    baseUrl = inject(BASE_URL);

    constructor(
        private dataService: ClientDataService,
        private localizationService: LocalizationService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.customMenuData = [
            { text: this.localizationService.translate('common.actions'), disabled: true, cssClass: 'k-group-menu' },
            { text: this.localizationService.translate('common.clearAll'), click: () => this.clearAll() }
        ];
    }

    clearAll() {
        const url = `${this.baseUrl}api/activityLog/clearAll`;

        this.loading = true;
        this.dataService
            .fetchJsonBodyPost(url, {})
            .then(() => {
                this.grid.reloadData().then(() => {
                    this.grid.clearSelectedKeys();
                    this.toastrService.success(this.localizationService.translate('message.clearAllCompleted'));
                });
            })
            .catch((error: Error) => {
                Promise.reject(error);
            })
            .finally(() => (this.loading = false));
    }
}
