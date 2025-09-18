import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormComponent],
    selector: "language-edit",
    templateUrl: './language-edit.html',
})
export class LanguageEditComponent {
    options: EditFormOptions = {
        parentUrl: "client/language",
        createUrl: "api/language/create",
        editUrl: "api/language/edit"
    };

}