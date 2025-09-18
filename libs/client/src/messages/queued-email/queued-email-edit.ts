import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "queued-email-edit",
    templateUrl: './queued-email-edit.html',
})
export class QueuedEmailEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/queued-email",
        createUrl: "api/queuedEmail/create",
        editUrl: "api/queuedEmail/edit"
    };

}
