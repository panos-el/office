import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "customer-role-edit",
    templateUrl: './customer-role-edit.html',
})
export class CustomerRoleEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/customer-role",
        createUrl: "api/customerRole/create",
        editUrl: "api/customerRole/edit"
    };

}
