import { Component } from "@angular/core";
import { EditFormOptions } from "@office/core";
import { KendoEditFormSimpleComponent } from "@office/kendo-ui";

@Component({
    imports: [KendoEditFormSimpleComponent],
    selector: "captcha-settings-edit",
    templateUrl: './captcha-settings-edit.html',
})
export class CaptchaSettingsEditComponent {
    options: EditFormOptions = {
        parentUrl: "client",
        editUrl: "api/customCaptchaSettings/edit"
    };

}
