import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "schedule-task-edit",
    templateUrl: './schedule-task-edit.html',
})
export class ScheduleTaskEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/schedule-task",
        editUrl: "api/scheduleTask/edit"
    };

}
