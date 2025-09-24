import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormSimpleComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormSimpleComponent],
    selector: "customer-settings-edit",
    templateUrl: './customer-settings-edit.html',
})
export class CustomerSettingsEditComponent {
    options: EditFormOptions = {
        parentUrl: "client",
        editUrl: "api/customerSettings/edit"
    };

}
