import { Component, inject, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BASE_URL, ClientDataService, EditFormOptions, LocalizationService } from "@office/core";
import { EDIT_FORM_TOKEN, FormlyFormState, IEditFormToken, KendoEditFormComponent, KendoFormlyFormComponent } from "@office/kendo-ui";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
    imports: [KendoEditFormComponent, KendoFormlyFormComponent],
    selector: "email-account-edit",
    templateUrl: './email-account-edit.html',
})
export class EmailAccountEditComponent {
    @ViewChild('editForm', { read: EDIT_FORM_TOKEN }) editForm!: IEditFormToken;
    editOptions: EditFormOptions = {
        parentUrl: "client/email-account",
        createUrl: "api/emailAccount/create",
        editUrl: "api/emailAccount/edit"
    };

    public loading = false;
    state!: FormlyFormState;
    sendEmailLabel!: string;

    baseUrl = inject(BASE_URL);

    form = new UntypedFormGroup({});
    model: any;
    options: FormlyFormOptions = {};
    fields!: FormlyFieldConfig[];

    constructor(
        private dataService: ClientDataService,
        private localizationService: LocalizationService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.sendEmailLabel = this.localizationService.translate("pages.emailAccount.sendTestEmailTo");
        
        this.fields = [{
            wrappers: ["wrapper-kendo-fieldset"],
            props: {
                legend: "legend"
            },
            fieldGroup: [{
                key: 'sendEmail',
                type: 'kendo-button-textbox',
                props: {
                    label: 'Email',
                    placeholder: 'email to send',
                    showButton: (field: any, model: any) => {
                        return model?.id !== 0;
                    },
                    onClick: (field: any) => {
                        if(field?.model?.sendEmail)
                            this.sendEmail(field.model.sendEmail);
                    }
                },
            }]
        }];

        this.model = {
            sendEmail: ''
        };
    }
    
    sendEmail(sendTestEmailTo: string) {
        const val = this.editForm;
        console.log(sendTestEmailTo);
    }
    // sendEmail(sendTestEmailTo: string) {
    //     const url = `${this.baseUrl}api/emailAccount/sendTestEmail`;

    //     this.disabled = true;
    //     this.dataService.fetchJsonBodyPost(url, this.model, { sendTestEmailTo })
    //         .then((result: any) => {
    //             this.toastrService.success(result.info);
    //             this.form.get("sendEmail").setValue("");
    //         })
    //         .catch((error: Error) => {
    //             Promise.reject(error);
    //         })
    //         .finally(() => {
    //             this.disabled = false;
    //         });
    // }

    onFormlyFormStateChange(state: FormlyFormState) {
        this.state = state;
    }
}
