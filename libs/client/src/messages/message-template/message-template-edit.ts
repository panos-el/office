import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "message-template-edit",
    templateUrl: './message-template-edit.html',
})
export class MessageTemplateEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/message-template",
        createUrl: "api/messageTemplate/create",
        editUrl: "api/messageTemplate/edit"
    };

}
