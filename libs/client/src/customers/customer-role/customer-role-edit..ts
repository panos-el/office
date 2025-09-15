import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    selector: "customer-role-edit",
    imports: [KendoEditFormComponent],
    templateUrl: './customer-role-edit.html',
})
export class CustomerRoleEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/customer-role",
        createUrl: "api/customerRole/create",
        editUrl: "api/customerRole/edit"
    };

}
