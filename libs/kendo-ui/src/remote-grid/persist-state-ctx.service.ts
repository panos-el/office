import { Injectable, inject } from "@angular/core";
import { DialogRef, DialogService } from "@progress/kendo-angular-dialog";
import { PrimeNG } from "primeng/config";
import { ToastrService } from "ngx-toastr";

import { KendoRemoteGridComponent } from "./kendo-remote-grid";
import { PersistStateService } from "./persist-state.service";
import { PersistModelDialogComponent } from "./persist-model-dialog.component";
import { PersistListDialogComponent } from "./persist-list-dialog.component";
import { GridSettings, ColumnSettings, PersistStateItem } from "./api/public_api";

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_key: any, value: any) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

@Injectable()
export class PersistStateContextService {
    public grid!: KendoRemoteGridComponent;

    primeng = inject(PrimeNG);
    persistStateService = inject(PersistStateService);
    toastrService = inject(ToastrService);
    dialogService = inject(DialogService);

    public openPersistModelDialog(model: PersistStateItem) {

        const dialogRef: DialogRef = this.dialogService.open({
            content: PersistModelDialogComponent,
            minHeight: 200, minWidth: 250, width: 450, actionsLayout: 'end'
        });

        const instance = dialogRef.content.instance as PersistModelDialogComponent;
        instance.setModel(model);

        dialogRef.result.subscribe((result: any) => {
            if (result?.text === "Submit") {
                const value = instance.formGroup.value as PersistStateItem;
                this.createOrUpdatePersistState(value);
            }
        });
    }

    public openPersistListDialog() {
        const dialogRef: DialogRef = this.dialogService.open({
            content: PersistListDialogComponent,
            minHeight: 200, minWidth: 250, width: 850, actionsLayout: 'end',
            cssClass: "custom-list-dialog"
        });

        const instance = dialogRef.content.instance as PersistListDialogComponent;
        instance.title = this.primeng.getTranslation('title.manageViews');

        this.grid.loading = true;
        this.persistStateService.loadData({ persistType: this.grid.gridConfig.persistType })
            .then((data) => {
                instance.gridData = data;
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.grid.loading = false);

        dialogRef.result.subscribe((result: any) => {
            if (result.mode === 'save')
                this.createOrUpdatePersistState(result.dataItem)
            if (result.mode === 'edit')
                this.openPersistModelDialog(result.dataItem)
            if (result.mode === 'delete')
                this.removePersistState(result.dataItem.id);
            if (result.mode === 'select')
                this.selectPesrsistState(result.dataItem);
            if (result.mode === 'primary')
                this.primaryPesrsistState(result.dataItem.id);
        });
    }

    public createOrUpdatePersistState(persistState: PersistStateItem) {

        const state = { ...this.grid.state };
        state.skip = 0;

        const gridColumns: any[] = this.grid.grid.columns.toArray().filter((item: any) => !(item['isCheckboxColumn'] === true));

        const columns = gridColumns.map((item: any) => {
            return {
                field: item['field'],
                title: item['title'],
                width: item['width'],
                filter: item['filter'],
                sortable: item['sortable'],
                groupable: item['groupable'],
                filterable: item['filterable'],
                hidden: item['hidden'],
                locked: item['locked'],
                sticky: item['sticky'],
                format: item['format'],
                style: item['style'],
                class: item['class'],
                columnType: this.grid.columns.find((x) => x.field == item['field']).columnType,
                orderIndex: item['orderIndex']
            } as ColumnSettings;
        });

        const config: GridSettings = {
            state: state,
            columns: columns
        };

        const token = JSON.stringify(config, getCircularReplacer());

        persistState.token = token;

        this.grid.loading = true;
        this.persistStateService.createOrUpdate(persistState)
            .then(() => {
                if (persistState.id > 0)
                    this.toastrService.success(this.primeng.getTranslation('message.persistStateUpdeted'));
                else 
                    this.toastrService.success(this.primeng.getTranslation('message.persistStateInserted'));
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.grid.loading = false);
    }

    removePersistState(persistStateId: number) {

        this.grid.loading = true;
        this.persistStateService.remove(persistStateId)
            .then(() => {
                this.toastrService.success(this.primeng.getTranslation('message.deletionCompleted'));
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.grid.loading = false);
    }

    selectPesrsistState(persistState: PersistStateItem) {

        this.grid.loading = true;
        
        this.grid.gridConfig.token = persistState.token as string;
        this.grid.applyGridSettings();
        this.grid.applyDataSource().then(() => {
            this.toastrService.success(this.primeng.getTranslation('message.persistStateSelected'));
        })
        .catch((error: Error) => {
            Promise.reject(error);
        }).finally(() => this.grid.loading = false);

        /* 
        this.grid.loading = true;
        this.persistStateService.select(persistState.id)
            .then((result) => {
                this.grid.gridConfig.token = persistState.token as string;
                this.grid.applyGridSettings();
                this.grid.applyDataSource().then(() => {
                    this.toastrService.success(this.primeng.getTranslation('message.persistStateSelected'));
                });
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.grid.loading = false);
        */
    }

    primaryPesrsistState(persistStateId: number) {

        this.grid.loading = true;
        this.persistStateService.primary(persistStateId)
            .then(() => {
                this.toastrService.success(this.primeng.getTranslation('message.persistStateSetPrimary'));
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.grid.loading = false);
    }
}