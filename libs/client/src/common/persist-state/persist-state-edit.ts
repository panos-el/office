import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "persist-state-edit",
    templateUrl: './persist-state-edit.html',
})
export class PersistStateEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/persist-state",
        createUrl: "api/persistState/create",
        editUrl: "api/persistState/edit"
    };

}
