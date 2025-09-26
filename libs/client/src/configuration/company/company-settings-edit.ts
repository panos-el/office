import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormSimpleComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormSimpleComponent],
    selector: "company-settings-edit",
    templateUrl: './company-settings-edit.html',
})
export class CompanySettingsEditComponent {
    options: EditFormOptions = {
        parentUrl: "client",
        editUrl: "api/companySettings/edit"
    };

}
