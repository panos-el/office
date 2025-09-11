import { Injectable } from '@angular/core';
import { DialogCloseResult, DialogService } from '@progress/kendo-angular-dialog';
import { DialogResultEnum } from '@office/core';
import { ConfirmationDialogComponent, ConfirmationDialogOptions, DialogResultAction } from './confirmation-dialog.component';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogService {
    constructor(private dialogService: DialogService) { }

    public open(options: ConfirmationDialogOptions): Promise<DialogResultEnum> {

        return new Promise((resolve) => {
            setTimeout(() => {
                
                const dialogRef = this.dialogService.open({
                    content: ConfirmationDialogComponent,
                    height: 200, minWidth: 250, width: 450
                });

                const instance = dialogRef.content.instance as ConfirmationDialogComponent;
                instance.options = options;
                
                dialogRef.result.pipe(first()).subscribe((resultRef) => {
                    if (resultRef instanceof DialogCloseResult) {
                        resolve(DialogResultEnum.Cancel);
                    } else {
                        resolve((resultRef as DialogResultAction).result);
                    }
                });
            }, 0);
        });
    };
}
