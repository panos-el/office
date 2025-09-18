import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "activity-log-type-edit",
    templateUrl: './activity-log-type-edit.html',
})
export class ActivityLogTypeEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/activity-log-type",
        createUrl: "api/activityLogType/create",
        editUrl: "api/activityLogType/edit"
    };

}