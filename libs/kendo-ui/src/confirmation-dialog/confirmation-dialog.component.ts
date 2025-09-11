import { Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ButtonThemeColor, KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_DIALOGS, DialogContentBase, DialogRef, DialogAction } from '@progress/kendo-angular-dialog';
import { DialogResultEnum } from '@office/core';
import { PrimeNG } from 'primeng/config';

export declare class DialogResultAction extends DialogAction {
    id?: number;
    visible?: boolean;
    result: DialogResultEnum;
}

export interface ConfirmationDialogOptions { 
    message?: string;
    title?: string;
    titleColor?: string;
    yesColor?: ButtonThemeColor;
    noColor?: ButtonThemeColor;
    cancelColor?: ButtonThemeColor;
    saveColor?: ButtonThemeColor;
    deleteColor?: ButtonThemeColor;    
    yesVisible?: boolean;
    noVisible?: boolean;
    cancelVisible?: boolean;
    saveVisible?: boolean;
    deleteVisible?: boolean;    
    yesLabel?: string;
    noLabel?: string;
    cancelLabel?: string;
    saveLabel?: string;
    deleteLabel?: string;
}

@Component({
    imports: [KENDO_DIALOGS, KENDO_BUTTONS],
    selector: 'confirmation-dialog',
    templateUrl: "./confirmation-dialog.component.html",
})
export class ConfirmationDialogComponent extends DialogContentBase implements OnInit {
    @ViewChild('header') titleElement!: ElementRef;
    primeng = inject(PrimeNG);

    @Input() options!: ConfirmationDialogOptions;

    headerButtonAction: DialogResultAction = { text: "header", result: DialogResultEnum.HeaderButtonClick };
    outsideDialogAction: DialogResultAction = { text: "outside", result: DialogResultEnum.OutsideDialogClick };
    actions!: DialogResultAction[];

    constructor(dialogRef: DialogRef) {
        super(dialogRef);
    }

    ngOnInit(): void {
        const options: ConfirmationDialogOptions = {
            title: this.primeng.getTranslation('common.confirmation'),
            yesColor: 'primary',
            noColor: 'base',
            cancelColor: 'base',
            saveColor: 'primary',
            deleteColor: 'primary',            
            yesVisible: true,
            noVisible: true,
            cancelVisible: false,
            saveVisible: false,
            deleteVisible: false,            
            yesLabel: this.primeng.getTranslation('common.yes'),
            noLabel: this.primeng.getTranslation('common.no'),
            cancelLabel: this.primeng.getTranslation('common.cancel'),
            saveLabel: this.primeng.getTranslation('common.save'),
            deleteLabel: this.primeng.getTranslation('common.delete'),
        };

        this.options = Object.assign({}, options, this.options);

        const yesAction: DialogResultAction = { id: 1, text: this.options.yesLabel!, themeColor: this.options.yesColor, visible: this.options.yesVisible, result: DialogResultEnum.Yes };
        const noAction: DialogResultAction = { id: 2, text: this.options.noLabel!, themeColor: this.options.noColor, visible: this.options.noVisible, result: DialogResultEnum.No };
        const cancelAction: DialogResultAction = { id: 3, text: this.options.cancelLabel!, themeColor: this.options.cancelColor, visible: this.options.cancelVisible, result: DialogResultEnum.Cancel };
        const saveAction: DialogResultAction = { id: 1, text: this.options.saveLabel!, themeColor: this.options.saveColor, visible: this.options.saveVisible, result: DialogResultEnum.Save };
        const deleteAction: DialogResultAction = { id: 1, text: this.options.deleteLabel!, themeColor: this.options.deleteColor, visible: this.options.deleteVisible, result: DialogResultEnum.Delete };

        const actions: DialogResultAction[] = [
            yesAction, noAction, cancelAction, saveAction, deleteAction
        ];

        this.actions = actions.filter(x => x.visible).sort((a, b) => a.id! - b.id!); 
    }

    override ngAfterViewInit() {
        if (this.options.titleColor)
            this.titleElement.nativeElement.style.color = this.options.titleColor;

        super.ngAfterViewInit();
    }
    
    headerButtonClick() {        
        this.dialog.close(this.headerButtonAction);
    }

    onClose(action: DialogResultAction) {
        this.dialog.close(action);
    }

    // HostListener to detect outside clicks
    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;

        // Check if the click is outside the dialog
        if (!target.closest('.k-dialog')) {
            this.dialog.close(this.outsideDialogAction);
        }
    }
}
