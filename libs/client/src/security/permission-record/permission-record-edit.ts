import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "permission-record-edit",
    templateUrl: './permission-record-edit.html',
})
export class PermissionRecordEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/permission-record",
        createUrl: "api/permissionRecord/create",
        editUrl: "api/permissionRecord/edit"
    };

}
