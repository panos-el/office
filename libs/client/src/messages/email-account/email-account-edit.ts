import { Component, inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BASE_URL, ClientDataService, EditFormOptions, LocalizationService } from "@office/core";
import { FormlyContext, KendoEditFormComponent, KendoEditFormlyComponent } from "@office/kendo-ui";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { UntypedFormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    imports: [CommonModule, KendoEditFormComponent, KendoEditFormlyComponent],
    selector: "email-account-edit",
    templateUrl: './email-account-edit.html',
})
export class EmailAccountEditComponent {
    editOptions: EditFormOptions = {
        parentUrl: "client/email-account",
        createUrl: "api/emailAccount/create",
        editUrl: "api/emailAccount/edit"
    };

    public loading = false;
    sendEmailLabel!: string;
    emailAccount: any;

    baseUrl = inject(BASE_URL);

    form = new UntypedFormGroup({});
    model: any;
    options: FormlyFormOptions = {};
    fields!: FormlyFieldConfig[];

    constructor(
        private dataService: ClientDataService,
        private localizationService: LocalizationService,
        private toastr: ToastrService
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
                        return this.emailAccount?.id !== 0;
                    },
                    onButtonClick: (field: any) => {  
                                                                  
                        return new Promise((resolve, reject) => {          
                            const sendTestEmailTo = field?.model?.sendEmail; 

                            if (sendTestEmailTo) { 
                                
                                const url = `${this.baseUrl}api/emailAccount/sendTestEmail`;

                                this.dataService.fetchJsonBodyPost(url, this.emailAccount, { sendTestEmailTo })
                                    .then((result: any) => {
                                        field.form.get("sendEmail").setValue("");
                                        this.toastr.success(result.info);
                                        resolve({});
                                    })
                                    .catch((error: Error) => {
                                        reject(error);
                                    });           
                            } else {
                                this.toastr.info("Enter a legal email");
                                resolve({});  
                            }
                        });
                    }
                },
            }]
        }];

        this.model = {
            sendEmail: null
        };
    }
    
    formlyContextChange(state: FormlyContext) {
        this.emailAccount = state.model;
    }
}
