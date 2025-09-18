import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "country-edit",
    templateUrl: './country-edit.html',
})
export class CountryEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/country",
        createUrl: "api/country/create",
        editUrl: "api/country/edit"
    };

}
