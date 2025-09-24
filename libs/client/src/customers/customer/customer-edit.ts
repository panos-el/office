import { Component } from "@angular/core";
import { EditFormOptions, getLeafNodesWithKeys } from "@office/core";
import { FormlyContext, KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "customer-edit",
    templateUrl: './customer-edit.html',
})
export class CustomerEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/customer",
        createUrl: "api/customer/create",
        editUrl: "api/customer/edit"
    };

    formlyContextChange(props: FormlyContext) {
        const fields = getLeafNodesWithKeys(props.fields);
        const password = fields['password'];
    }
}
