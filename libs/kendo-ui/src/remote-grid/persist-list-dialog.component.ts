import { CommonModule } from "@angular/common";
import { Component, HostListener, Input, OnInit } from "@angular/core";
import { DialogContentBase, DialogRef, KENDO_DIALOGS } from "@progress/kendo-angular-dialog";
import { KENDO_GRID } from "@progress/kendo-angular-grid";
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { PrimeNG } from "primeng/config";

@Component({
    standalone: true,
    imports: [CommonModule, KENDO_GRID, KENDO_BUTTONS, KENDO_DIALOGS],
    selector: "persist-list-dialog",
    template: `
        <kendo-dialog-titlebar>
            <div style="font-size: 18px; line-height: 1.3em;">
                <span>{{title}}</span>
            </div>
        </kendo-dialog-titlebar>

        <kendo-grid [data]="gridData"
                    [resizable]="true"
                    [navigable]="true"
                    [height]="300">
            <kendo-grid-column field="name" [width]="200" [title]="nameLabel"></kendo-grid-column>
            <kendo-grid-column field="primary" [width]="100" [title]="primaryLabel" [style]="{'text-align': 'center'}">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <span [class]="dataItem.primary ? 'k-icon k-font-icon k-i-success !k-color-success' : 'k-icon k-font-icon k-i-close !k-color-light'"></span>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="displayOrder" [width]="100" [title]="displayOrderLabel" [style]="{'text-align': 'center'}"></kendo-grid-column>
            <kendo-grid-column [width]="100" [style]="{'text-align': 'center'}">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <button kendoButton themeColor="primary" (click)="action('select', dataItem)">{{selectLabel}}</button>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column [width]="100" [style]="{'text-align': 'center'}">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <button kendoButton themeColor="success" (click)="action('primary', dataItem)">{{primaryLabel}}</button>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column [width]="150" [style]="{'text-align': 'center'}">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <button kendoButton iconClass="k-icon k-font-icon k-i-save !k-color-success" (click)="action('save', dataItem)" [title]="saveLabel"></button>
                    <button kendoButton iconClass="k-icon k-font-icon k-i-edit !k-color-warning" (click)="action('edit', dataItem)" style="margin-left: 10px" [title]="editLabel"></button>
                    <button kendoButton iconClass="k-icon k-font-icon k-i-trash !k-color-error" (click)="action('delete', dataItem)" style="margin-left: 10px" [title]="deleteLabel"></button>
                </ng-template>
            </kendo-grid-column>
        </kendo-grid>
  `,
})
export class PersistListDialogComponent extends DialogContentBase implements OnInit {       
    @Input() public title!: string;
    @Input() public gridData: any[] = [];
    public saveLabel!: string;
    public editLabel!: string;
    public deleteLabel!: string;
    public selectLabel!: string;
    public nameLabel!: string;
    public primaryLabel!: string;
    public displayOrderLabel!: string;

    constructor(dialogRef: DialogRef, private primengConfig: PrimeNG) {
        super(dialogRef);
    }

    ngOnInit(): void {
        this.saveLabel = this.primengConfig.getTranslation('common.save');
        this.editLabel = this.primengConfig.getTranslation('common.edit');
        this.deleteLabel = this.primengConfig.getTranslation('common.delete');
        this.selectLabel = this.primengConfig.getTranslation('common.select');

        this.nameLabel = this.primengConfig.getTranslation('persistStateModel.name');
        this.primaryLabel = this.primengConfig.getTranslation('persistStateModel.primary');
        this.displayOrderLabel = this.primengConfig.getTranslation('persistStateModel.displayOrder');
    }

    action(mode: string, dataItem: any) {
        this.dialog.close({ mode, dataItem });
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
