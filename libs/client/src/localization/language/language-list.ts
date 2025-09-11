import { Component, Inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BASE_URL, ClientDataService, LocalizationService } from "@office/core";
import { ToastrService } from "ngx-toastr";
import { PrimeNG } from 'primeng/config';

@Component({
    selector: "language-list",
    templateUrl: "./language-list.html"
})
export class LanguageListComponent implements OnInit {
    @ViewChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<any>;
    getApiUrl = 'language/list';
    postApiUrl = 'language/list';
    pathUrl = 'dashboard/language';
    customMenuLabel: string;
    customMenuData!: any[];
    public loading = false;

    constructor(
        @Inject(BASE_URL) private baseUrl: string,
        private dataService: ClientDataService,
        private localizationService: LocalizationService,
        private primengConfig: PrimeNG,
        private toastrService: ToastrService) {
        this.customMenuLabel = this.primengConfig.getTranslation('common.settings');
    }

    ngOnInit(): void {

        this.customMenuData = [
            { text: this.localizationService.translate('common.importResources'), click: () => this.importResources() }
        ];
    }

    importResources() {
        const url = `${this.baseUrl}/language/importResources`;

        this.loading = true;
        this.dataService.fetchJsonBodyPost(url, {})
            .then(() => {
                this.toastrService.success(this.primengConfig.getTranslation('message.insertionCompleted'));
            })
            .catch((err: Error) => {
                Promise.reject(err);
            }).finally(() => this.loading = false);
    }

    onColumnsChange(columnDefs: any[]): void {
        // Dynamically assign templates to the column definitions
        columnDefs.map((col) => {
            if (col.field === 'actions') {
                col['templateRef'] = this.actionsTemplate
                //return { ...col, template: this.actionsTemplate };
            }
            return col;
        });
    }

}
