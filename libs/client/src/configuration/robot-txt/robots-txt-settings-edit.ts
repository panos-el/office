import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormSimpleComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormSimpleComponent],
    selector: "robots-txt-settings-edit",
    templateUrl: './robots-txt-settings-edit.html',
})
export class RobotsTxtSettingsEditComponent {
    options: EditFormOptions = {
        parentUrl: "client",
        editUrl: "api/robotsTxtSettings/edit"
    };

}
