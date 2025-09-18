import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, ClientDataService, ListFormOptions, LocalizationService } from '@office/core';
import { KendoRemoteGridComponent } from '@office/kendo-ui';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CommonModule, ReactiveFormsModule, KendoRemoteGridComponent, KENDO_BUTTON],
  selector: 'schedule-task-list',
  templateUrl: './schedule-task-list.html',
})
export class ScheduleTaskListComponent implements OnInit {    
    options: ListFormOptions = {
      propertiesUrl: 'api/scheduleTask/list',
      dataSourceUrl: 'api/scheduleTask/list',
      pathUrl: 'client/schedule-task'
    };
    
    public loading = false;
    public runNowLabel!: string;

    baseUrl = inject(BASE_URL);

    constructor(
        private dataService: ClientDataService,
        private localizationService: LocalizationService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.runNowLabel = this.localizationService.translate("common.execute");
    }

    runNow(item: any) {
        const url = `${this.baseUrl}api/scheduleTask/runNow`;

        this.loading = true;
        this.dataService.fetchJsonBodyGet(url, { id: item.id})
            .then(() => {
                this.toastrService.success(this.localizationService.translate('message.successfullyCompleted'));
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.loading = false);
    }

}
