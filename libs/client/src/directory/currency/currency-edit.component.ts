import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    selector: "currency-edit",
    imports: [KendoEditFormComponent],
    templateUrl: './currency-edit.component.html',
})
export class CurrencyEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/currency",
        createUrl: "api/currency/create",
        editUrl: "api/currency/edit"
    };

}
