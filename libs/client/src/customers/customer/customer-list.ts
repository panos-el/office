import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, ClientDataService, ListFormOptions, LocalizationService } from '@office/core';
import { KendoGridToken, KendoRemoteGridComponent } from '@office/kendo-ui';
import { saveAs } from '@progress/kendo-file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent],
  selector: 'customer-list',
  templateUrl: './customer-list.html',
})
export class CustomerListComponent {    
    @ViewChild(KendoGridToken) grid!: KendoGridToken;

    options: ListFormOptions = {
      propertiesUrl: 'api/customer/list',
      dataSourceUrl: 'api/customer/list',
      deleteUrl: 'api/customer/delete',
      // deleteSelectedUrl: 'api/customer/deleteSelected',
      pathUrl: 'client/customer'
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
            { text: this.localizationService.translate('common.exportToPdf'), click: () => this.exportToPdf() },
            { text: this.localizationService.translate('common.exportToExcel'), click: () => this.exportToExcel() }
        ];
    }

    exportToPdf() {
        const url = `${this.baseUrl}api/customer/exportToPdf`;

        this.dataService.fetchBlobBodyPost(url, this.grid.getSelectedKeys())
            .then((result: any) => {
                saveAs(result, "customers.pdf");
            })
            .catch((error: Error) => {
                Promise.reject(error);
            });
    }

    exportToExcel() {
        const url = `${this.baseUrl}api/customer/exportToExcel`;

        this.dataService.fetchBlobResponseBodyPost(url, this.grid.getSelectedKeys())
            .then((response) => {
                //saveAs(result, "customers.xlsx");

                const contentDisposition = response.headers.get('content-disposition');
                let filename = 'customers.xlsx'; // default filename

                if (contentDisposition) {
                    // Check for the UTF-8 encoded filename first
                    let matches = /filename\*=UTF-8''([^;]+)/.exec(contentDisposition);
                    if (matches && matches[1]) {
                        // Decode in case of any URI encoding
                        filename = decodeURIComponent(matches[1].trim());
                    } else {
                        // Fallback: check for the standard filename pattern with or without quotes
                        matches = /filename="?([^";]+)"?/.exec(contentDisposition);
                        if (matches && matches[1]) {
                            filename = matches[1].trim();
                        }
                    }
                }

                // Create the Blob URL and trigger download
                const blob = new Blob([response.body!], { type: response.body!.type });
                const downloadURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadURL;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(downloadURL);
            })
            .catch((error: Error) => {
                Promise.reject(error);
            });
    }

    // Method to download the file
    downloadFile() {
        const url = `${this.baseUrl}api/customer/exportToExcel`;

        this.dataService.fetchBlobBodyPost(url, this.grid.getSelectedKeys())
            .then((blob) => {
            // Create a URL for the blob
            const downloadURL = window.URL.createObjectURL(blob);
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = downloadURL;
            // Set the file name (ensure the extension is correct, e.g., .xlsx)
            link.download = 'customers.xlsx';
            // Append the link to the DOM (required for Firefox)
            document.body.appendChild(link);
            // Trigger the download by simulating click
            link.click();
            // Clean up and remove the link
            link.remove();
        });
    }

}
