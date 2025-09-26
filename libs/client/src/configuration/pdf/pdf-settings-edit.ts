import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormSimpleComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormSimpleComponent],
    selector: "pdf-settings-edit",
    templateUrl: './pdf-settings-edit.html',
})
export class PdfSettingsEditComponent {
    options: EditFormOptions = {
        parentUrl: "client",
        editUrl: "api/pdfSettings/edit"
    };

}
