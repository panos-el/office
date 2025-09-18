import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "store-edit",
    templateUrl: './store-edit.html',
})
export class StoreEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/store",
        createUrl: "api/store/create",
        editUrl: "api/store/edit"
    };

}
