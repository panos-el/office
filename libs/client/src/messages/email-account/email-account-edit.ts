import { AfterViewInit, Component, inject, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BASE_URL, ClientDataService, EditFormOptions, LocalizationService } from "@office/core";
import { EditFormToken, FormlyContext, KendoEditFormComponent, KendoEditFormlyComponent } from "@office/kendo-ui";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
    imports: [KendoEditFormComponent, KendoEditFormlyComponent],
    selector: "email-account-edit",
    templateUrl: './email-account-edit.html',
})
export class EmailAccountEditComponent implements AfterViewInit {
    @ViewChild(EditFormToken) editForm!: EditFormToken;
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
        private toastrService: ToastrService
    ) {}

    ngAfterViewInit(): void {
        if(this.editForm) {
            const form = this.editForm;
        }
    }

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
                                                                  
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {                                
                                if (field?.model?.sendEmail) { 
                                    console.log('email send');                
                                }
                                resolve({});  
                            }, 3000);             
                        });


                        // if(field?.model?.sendEmail)
                        //     return this.sendEmail(field.model.sendEmail);
                        // return Promise.resolve({});
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
        return Promise.resolve({});
    }
    // sendEmail(sendTestEmailTo: string) {
    //     const url = `${this.baseUrl}api/emailAccount/sendTestEmail`;

    //     this.disabled = true;
    //     this.dataService.fetchJsonBodyPost(url, this.emailAccount, { sendTestEmailTo })
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

    formlyContextChange(state: FormlyContext) {
        this.emailAccount = state.model;
    }
}
