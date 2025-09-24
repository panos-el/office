import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, ClientDataService, ListFormOptions, LocalizationService } from '@office/core';
import { KendoGridToken, KendoRemoteGridComponent } from '@office/kendo-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
    imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
    selector: 'language-list',
    templateUrl: './language-list.html'
})
export class LanguageListComponent implements OnInit {
    @ViewChild(KendoGridToken) grid!: KendoGridToken;

    options: ListFormOptions = {
        propertiesUrl: 'api/language/list',
        dataSourceUrl: 'api/language/list',
        deleteUrl: 'api/language/delete',
        // deleteSelectedUrl: 'api/language/deleteSelected',
        pathUrl: 'client/language'
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
            { text: this.localizationService.translate('common.importResources'), click: () => this.importResources() }
        ];
    }

    importResources() {
        const url = `${this.baseUrl}api/language/importResources`;

        this.loading = true;
        this.dataService
            .fetchJsonBodyPost(url, {})
            .then(() => {
                this.toastrService.success(this.localizationService.translate('message.insertionCompleted'));
            })
            .catch((err: Error) => {
                Promise.reject(err);
            })
            .finally(() => (this.loading = false));
    }
}
