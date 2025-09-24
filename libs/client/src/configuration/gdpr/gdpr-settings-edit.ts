import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormSimpleComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormSimpleComponent],
    selector: "gdpr-settings-edit",
    templateUrl: './gdpr-settings-edit.html',
})
export class GdprSettingsEditComponent {
    options: EditFormOptions = {
        parentUrl: "client",
        editUrl: "api/gdprSettings/edit"
    };

}
