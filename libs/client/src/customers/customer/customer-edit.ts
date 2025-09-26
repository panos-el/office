import { Component, inject } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from "@ngx-formly/core";
import { BASE_URL, ClientDataService, EditFormOptions, getLeafNodesWithKeys } from "@office/core";
import { FormlyContext, KendoEditFormComponent } from "@office/kendo-ui";
import { ToastrService } from "ngx-toastr";

@Component({
    imports: [KendoEditFormComponent],
    selector: "customer-edit",
    templateUrl: './customer-edit.html',
})
export class CustomerEditComponent {
    baseUrl = inject(BASE_URL);
    dataService = inject(ClientDataService);
    toastr = inject(ToastrService);

    options: EditFormOptions = {
        parentUrl: "client/customer",
        createUrl: "api/customer/create",
        editUrl: "api/customer/edit"
    };

    formlyContextChange(props: FormlyContext) {
        const fields = getLeafNodesWithKeys(props.fields);
        const password = fields['password'] as any;
        
        password.props['showButton'] = (field: any, model: any) => {
            return model?.id !== 0;
        };

        password.props['onButtonClick'] = (field: any) => {
            const url = `${this.baseUrl}api/customer/changePassword`;
                  
            return new Promise((resolve, reject) => {

                this.dataService.fetchJsonBodyPost(url, { id: field.model.id, password: field.model.password })
                    .then((result: any) => {
                        field.form.get('password').setValue(null);
                        field.form.markAsPristine();

                        this.toastr.success(result.info);

                        resolve({});
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });     
            });
        };

    }
}
