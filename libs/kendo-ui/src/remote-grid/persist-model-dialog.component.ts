import { Component, HostListener, Input, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DialogContentBase, DialogRef, KENDO_DIALOGS } from "@progress/kendo-angular-dialog";
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { KENDO_LABEL } from "@progress/kendo-angular-label";
import { PrimeNG } from "primeng/config";
import { PersistStateItem } from "./api/persist-state-item";

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, KENDO_BUTTONS, KENDO_DIALOGS, KENDO_INPUTS, KENDO_LABEL],
    selector: "persist-model-dialog",
    template: `
        <kendo-dialog-titlebar>
            <div style="font-size: 18px; line-height: 1.3em;">
                <span>{{title}}</span>
            </div>
        </kendo-dialog-titlebar>

        <div style="padding: 1rem;">
            <form class="k-form" [formGroup]="formGroup">
                <kendo-formfield style="margin-bottom: 1rem;">
                    <kendo-label [for]="name" [text]="nameLabel"></kendo-label>
                    <kendo-textbox #name formControlName="name"></kendo-textbox>
                </kendo-formfield>
                <!--
                <kendo-formfield style="margin-bottom: 1rem;">
                    <kendo-label [for]="primary" [text]="primaryLabel"></kendo-label>
                    <input kendoCheckBox #primary type="checkbox" formControlName="primary"/>
                </kendo-formfield>
                 -->
                <kendo-formfield style="margin-bottom: 1rem;">
                    <kendo-label [for]="displayOrder" [text]="displayOrderLabel"></kendo-label>
                    <kendo-numerictextbox format="#" [decimals]="0" #displayOrder formControlName="displayOrder"></kendo-numerictextbox>
                </kendo-formfield>
            </form>
        </div>

        <kendo-dialog-actions layout="end">
            <button kendoButton (click)="onConfirmAction()" themeColor="primary" [disabled]="!formGroup.valid">{{saveLabel}}</button>
            <button kendoButton (click)="onCancelAction()">{{cancelLabel}}</button>
        </kendo-dialog-actions>
  `,
})
export class PersistModelDialogComponent extends DialogContentBase implements OnInit {
    @Input() public id!: number;
    @Input() public name!: string;
    @Input() public primary!: boolean;
    @Input() public displayOrder!: number;

    public title!: string;
    public saveLabel!: string;
    public cancelLabel!: string;
    public nameLabel!: string;
    public primaryLabel!: string;
    public displayOrderLabel!: string;

    public formGroup!: FormGroup;

    primengConfig = inject(PrimeNG);
    formBuilder = inject(FormBuilder);

    constructor(dialogRef: DialogRef) {
        super(dialogRef);
    }

    ngOnInit(): void {
        this.saveLabel = this.primengConfig.getTranslation('common.save');
        this.cancelLabel = this.primengConfig.getTranslation('common.cancel');
        this.nameLabel = this.primengConfig.getTranslation('persistStateModel.name');
        this.primaryLabel = this.primengConfig.getTranslation('persistStateModel.primary');
        this.displayOrderLabel = this.primengConfig.getTranslation('persistStateModel.displayOrder');
    }

    public setModel(model: PersistStateItem): void {
        this.title = this.primengConfig.getTranslation(model.id === 0 ? 'title.newView' : 'title.editView');

        this.formGroup = this.formBuilder.group({
            id: [model.id],
            customerId: [model.customerId],
            name: [model.name, Validators.required],
            primary: [model.primary],
            displayOrder: [model.displayOrder],
            persistType: [model.persistType],
            token: [model.token],
        });
    }
    
    public onCancelAction(): void {
        this.dialog.close({ text: "Cancel" });
    }

    public onConfirmAction(): void {
        this.dialog.close({ text: "Submit" });
    }

    // HostListener to detect outside clicks
    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;

        // Check if the click is outside the dialog
        if (!target.closest('.k-dialog')) {
            this.dialog.close();
        }
    }
}
