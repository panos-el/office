import { Directive, EventEmitter, inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { FilterExpression } from '@progress/kendo-angular-filter';
import { CellClickEvent, ColumnMenuSettings, DataStateChangeEvent, GridComponent, GridDataResult, GroupableSettings } from '@progress/kendo-angular-grid';
import { IntlService } from '@progress/kendo-angular-intl';
import { AggregateDescriptor, CompositeFilterDescriptor, DataSourceRequestState, State, toDataSourceRequestString, translateDataSourceResultGroups } from '@progress/kendo-data-query';
import { PrimeNG } from 'primeng/config';

import { BASE_URL, ClientDataService, DialogResultEnum, isIsoDateString, ListFormOptions, stringFormat } from '@office/core';

import { ConfirmationDialogOptions } from '../../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { PersistStateItem } from '../api/persist-state-item';
import { GridConfig } from '../api/grid-config.interface';
import { GridSettings } from '../api/grid-settings.interface';
import { mapDateFilter } from '../api/map-date-fliter';
import { KendoGridToken } from '../api/kendo-grid-token';
import { PersistStateContextService } from '../services/persist-state-ctx.service';

@Directive({
    selector: '[kendoRemoteGridBase]'
})
export abstract class KendoRemoteGridBase extends KendoGridToken implements OnInit {
    // ---- Template refs / Kendo grid ref
    @ViewChild(GridComponent) public grid!: GridComponent;

    // ---- Templates & aggregates
    @Input() buttonTemplates!: { [key: string]: TemplateRef<any> };
    @Input() aggregatable = false;
    @Input() aggregateDescriptors!: AggregateDescriptor[];
    @Input() aggregateTemplates!: { [key: string]: TemplateRef<any> };

    // ---- Feature flags
    @Input() animate = true;
    @Input() pageTitleEnable = true;
    @Input() filterCommandEnable = true;
    @Input() columnChooserCommandEnable = true;
    @Input() insertCommandEnable = true;
    @Input() deleteCommandEnable = true;

    // ---- Settings menu
    @Input() gridMenuEnable = true;
    @Input() persistStateMenuEnable = true;
    settingsMenuEnable!: boolean;
    settingsMenuData: any[] = [];
    @Input() customMenuData!: any[];

    // ---- Selection
    @Input() checkboxColumnEnable = true;
    @Input() showSelectAllEnable = true;
    @Input() dataKey: string = 'id';
    @Input() set selectedKeys(value: number[]) {
        this._selectedKeys = value;
        this.selectedKeysChange.emit(value);
    }
    get selectedKeys(): number[] {
        return this._selectedKeys;
    }
    private _selectedKeys: number[] = [];

    // ---- Misc
    @Input() gridHeight!: number;
    @Input() resizable = true;
    @Input() reorderable = true;
    @Input() columnMenu: ColumnMenuSettings | boolean = false;
    @Input() dblClickEnable = true;
    @Input() landscape = false;
    @Input() excelExportAllEnable = true;

    // ---- Quick search
    @Input() quickSearchEnable = true;
    quickSearch = '';

    // ---- Export buttons
    @Input() excelCommandEnable = true;
    @Input() pdfCommandEnable = true;

    // ---- Filter panel
    filterPanelVisible = false;
    filterExpressions!: FilterExpression[];
    filterPanelValue!: CompositeFilterDescriptor;

    // ---- Data state
    @Input() formOptions!: ListFormOptions; // still an input; can be replaced using hooks if you prefer
    @Input() loading = false;
    gridConfig!: GridConfig;
    gridData!: GridDataResult;
    state!: State;
    columns!: any[];

    protected _columnMenuDefaults: ColumnMenuSettings = {
        sort: false,
        lock: true,
        stick: true,
        columnChooser: false,
        autoSizeColumn: true
    };
    public columnMenuSettings: boolean | ColumnMenuSettings = false;

    // ---- Labels / i18n
    trueLabel!: string;
    falseLabel!: string;
    applyFilterLabel!: string;
    autofitColumnsLabel!: string;
    insertLabel!: string;
    deleteLabel!: string;
    settingsMenuLabel!: string;

    // ---- Outputs
    @Output() gridConfigChange = new EventEmitter<GridConfig>();
    @Output() selectedKeysChange = new EventEmitter<number[]>();

    // ---- DI
    protected clientDataService = inject(ClientDataService);
    protected baseUrl = inject(BASE_URL);
    protected primeng = inject(PrimeNG);
    protected router = inject(Router);
    protected intlService = inject(IntlService);
    protected toastrService = inject(ToastrService);
    protected dialogService = inject(ConfirmationDialogService);
    protected ptx = inject(PersistStateContextService);

    constructor() {
        super();
        this.ptx.grid = this as any; // keeps your existing Persist dialogs working
    }

    // =======================
    // Lifecycle
    // =======================
    ngOnInit(): void {
        this.initLabels();
        this.buildSettingsMenu();
        this.applyProperties();
    }

    // =======================
    // Hooks (override as needed)
    // =======================

    protected trackByItem(index: number/* , item: GridItem */): any {
        return index;
        //return item.data[this.config.dataKey];
    }

    /** Provide the properties (schema) URL. Default uses formOptions.propertiesUrl */
    protected getPropertiesUrl(): string {
        return `${this.baseUrl}${this.formOptions.propertiesUrl}`;
    }

    /** Provide the data URL (often same as properties). */
    protected getDataUrl(state: State): string {
        return `${this.baseUrl}${this.formOptions.propertiesUrl}?${toDataSourceRequestString(state as DataSourceRequestState)}`;
    }

    /** Provide params/body for POST when fetching data (quick search, etc.). */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected buildDataBody(state: State): any {
        return {};
    }
    protected buildDataParams(): any {
        return { quickSearch: this.quickSearch };
    }

    /** Transform columns/state before applying (e.g. date filter mapping). */
    protected mapColumns(settings: GridSettings): void {
        mapDateFilter(settings.state.filter, settings.columns);
    }

    /** Guard/side-effects before delete. Return false to cancel. */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected beforeDelete(_keys: Array<number>): boolean | Promise<boolean> {
        return true;
    }

    /** Side-effects after a successful delete. */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    protected afterDelete(_result: any): void {}

    /** Toggle Column Menu */
    public toggleColumnMenu(): void {
        this.columnMenuSettings = typeof this.columnMenuSettings === 'boolean' ? this._columnMenuDefaults : false;
    }

    // =======================
    // Public API
    // =======================

    protected applyProperties(): void {
        const url = this.getPropertiesUrl();
        this.loading = true;

        this.clientDataService
            .fetchJsonBodyGet<GridConfig>(url)
            .then((config) => {
                this.gridConfig = config;

                this.applyGridSettings();
                this.gridConfigChange.emit(config);

                return this.applyDataSource();
            })
            .catch((error: Error) => Promise.reject(error))
            .finally(() => (this.loading = false));
    }

    public applyDataSource(): Promise<void> {
        if (this.aggregatable && this.aggregateDescriptors?.length > 0) {
            (this.state as DataSourceRequestState)['aggregates'] = this.aggregateDescriptors;
        }

        const state = this.state ?? ({ skip: 0, take: 50 } as State);
        const url = this.getDataUrl(state);
        const hasGroups = !!(state.group && state.group.length);

        this.loading = true;
        return this.clientDataService
            .fetchJsonBodyPost<GridDataResult>(url, this.buildDataBody(state), this.buildDataParams())
            .then(({ data, total }) => {
                const translated = hasGroups ? translateDataSourceResultGroups(data) : data;
                this.gridData = { data: translated, total };
            })
            .catch((error: Error) => Promise.reject(error))
            .finally(() => (this.loading = false));
    }

    public reloadData(): Promise<void> {
        return this.applyDataSource();
    }

    public applyGridSettings(): void {
        const config = JSON.parse(this.gridConfig.token) as GridSettings;

        this.mapColumns(config); // hook

        this.columns = [...config.columns].sort((a, b) => a.orderIndex - b.orderIndex);
        this.applyFilterExpressions();
        this.applyState(config.state);
    }

    public onDataStateChange(event: DataStateChangeEvent): void {
        this.applyState(event);
        this.applyDataSource();
    }

    public applyState(state: State | DataStateChangeEvent): void {
        this.state = {
            skip: state.skip,
            take: state.take,
            sort: state.sort,
            group: state.group,
            filter: state.filter
        };
    }

    public applyFilterExpressions(): void {
        this.filterExpressions = this.columns
            .filter((x: any) => x.filterable)
            .map((x: any) => ({
                field: x.field,
                title: x.title,
                editor: x.filter === 'text' ? 'string' : x.filter === 'numeric' ? 'number' : x.filter
            }));
    }

    // ---- Group header formatter
    public groupHeaderTemplate(value: any): any {
        if (typeof value === 'boolean') return value ? this.trueLabel : this.falseLabel;
        if (typeof value === 'string' && isIsoDateString(value)) {
            return this.intlService.formatDate(new Date(value), 'd');
        }
        return value;
    }

    // ---- Quick search
    public onQuickSearchValueChange(value: any): void {
        this.state.skip = 0;
        this.quickSearch = value ?? '';
        this.applyDataSource();
    }

    // ---- Filters
    public applyFilter(value: CompositeFilterDescriptor): void {
        this.state.skip = 0;
        this.state.filter = value;
        this.applyDataSource();
    }

    public toggleFilterPanel(): void {
        if (!this.filterPanelVisible) {
            const filter = { ...(this.state.filter ?? { logic: 'and', filters: [] }) };
            this.filterPanelValue = filter as CompositeFilterDescriptor;
        }
        this.filterPanelVisible = !this.filterPanelVisible;
    }

    public get filterExist(): boolean {
        return (this.state?.filter?.filters?.length as number) > 0;
    }

    // ---- Selection
    public getSelectedKeys(): Array<number> {
        return this.selectedKeys;
    }
    public clearSelectedKeys(): void {
        this.selectedKeys = [];
    }

    // ---- Column events
    public onColumnReorder(e: any): void {
        const moved = this.columns.splice(e.oldIndex, 1);
        this.columns.splice(e.newIndex, 0, ...moved);
    }
    public onColumnResize(e: any): void {
        e.forEach((item: any) => {
            const col = this.columns.find((c: any) => c.field === item.column.field);
            if (col) col.width = item.newWidth;
        });
    }
    public onColumnVisibilityChange(e: any): void {
        e.columns.forEach((column: any) => {
            const col = this.columns.find((c: any) => c.field === column.field);
            if (col) col.hidden = column.hidden;
        });
    }

    // ---- Double click navigation
    private cellClickEvent!: CellClickEvent;
    public onCellClick(event: CellClickEvent): void {
        if (event.type === 'click') this.cellClickEvent = event;
    }

    public onDblClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const inCheckboxOrButton = target.closest('.k-grid-checkbox-column') || target.closest('.k-button');

        const closest = (node: any, predicate: (n: any) => boolean) => {
            while (node && !predicate(node)) node = node.parentNode;
            return node;
        };

        const isGridContent = (node: any) => node.classList?.contains('k-grid-content');

        if (this.dblClickEnable && this.cellClickEvent && !inCheckboxOrButton) {
            if (closest(event.target as HTMLElement, isGridContent)) {
                const id = (this.cellClickEvent.dataItem as any)[this.dataKey];
                this.router.navigate([this.formOptions.pathUrl, id]);
            }
        }
    }

    // ---- CRUD
    protected insertCommand(): void {
        this.router.navigate([this.formOptions.pathUrl, 0]);
    }

    protected deleteCommand(): void {
        const options: ConfirmationDialogOptions = {
            message: stringFormat(this.primeng.getTranslation('message.deleteSelection'), this.selectedKeys.length),
            titleColor: '#d51923'
        };

        this.dialogService.open(options).then(async (result) => {
            if (result !== DialogResultEnum.Yes) return;

            const proceed = await Promise.resolve(this.beforeDelete(this.selectedKeys));
            if (!proceed) return;

            if (this.formOptions.deleteSelectedUrl && this.selectedKeys.length > 1) {
                this.deleteEntityCore(`${this.baseUrl}${this.formOptions.deleteSelectedUrl}`, this.selectedKeys);
            } else if (this.formOptions.deleteUrl && this.selectedKeys.length === 1) {
                this.deleteEntityCore(`${this.baseUrl}${this.formOptions.deleteUrl}`, this.selectedKeys[0] as any);
            }
        });
    }

    private deleteEntityCore(apiUrl: string, value: number | Array<number>): void {
        const { url, body, params } = Array.isArray(value) ? { url: apiUrl, body: this.selectedKeys, params: undefined } : { url: apiUrl, body: {}, params: { id: value } };

        this.loading = true;
        this.clientDataService
            .fetchJsonBodyPost(url, body, params)
            .then((result: any) => {
                this.applyDataSource().then(() => {
                    this.clearSelectedKeys();
                    this.toastrService.success(result?.info || this.primeng.getTranslation('message.deletionCompleted'));
                    this.afterDelete(result);
                });
            })
            .catch((error: Error) => Promise.reject(error))
            .finally(() => (this.loading = false));
    }

    // ---- Excel Export (all)
    public excelExportAll = (): ExcelExportData | Promise<ExcelExportData> => {
        const result: ExcelExportData = { data: this.gridData?.data ?? [], group: this.state?.group };

        if (!this.excelExportAllEnable) return result;

        return new Promise<ExcelExportData>((resolve, reject) => {
            const state: State = Object.assign({}, this.state ?? {}, { skip: 0, take: 1_000_000 });
            const url = this.getDataUrl(state);
            const hasGroups = !!(state.group && state.group.length);

            this.loading = true;
            this.clientDataService
                .fetchJsonBodyPost<GridDataResult>(url, this.buildDataBody(state), this.buildDataParams())
                .then(({ data }) => {
                    result.data = hasGroups ? translateDataSourceResultGroups(data) : data;
                    resolve(result);
                })
                .catch(reject)
                .finally(() => (this.loading = false));
        });
    };

    // =======================
    // Private helpers
    // =======================
    private initLabels(): void {
        this.trueLabel = this.primeng.getTranslation('aria')['trueLabel'];
        this.falseLabel = this.primeng.getTranslation('aria')['falseLabel'];
        this.insertLabel = this.primeng.getTranslation('common.insert');
        this.deleteLabel = this.primeng.getTranslation('common.delete');
        this.autofitColumnsLabel = this.primeng.getTranslation('grid.autofitCulumns');
        this.settingsMenuLabel = this.primeng.getTranslation('common.settings');
        this.applyFilterLabel = this.primeng.getTranslation('common.apply');
    }

    private buildSettingsMenu(): void {
        if (this.gridMenuEnable) {
            const gridMenuData: any = [
                { text: this.primeng.getTranslation('common.configuration'), disabled: true, cssClass: 'k-group-menu' },
                {
                    text: this.primeng.getTranslation('grid.showGroup'),
                    click: () => {
                        const groupable = this.gridConfig?.groupable as GroupableSettings;
                        if (groupable) groupable.enabled = !groupable.enabled;
                    }
                },
                { text: this.primeng.getTranslation('grid.columnMenu'), click: () => this.toggleColumnMenu() },
                { text: this.primeng.getTranslation('grid.clearSelections'), click: () => this.clearSelectedKeys() }
            ];
            this.settingsMenuData.push(...gridMenuData);
        }

        if (this.persistStateMenuEnable) {
            const persistStateMenuData: any = [
                { text: this.primeng.getTranslation('grid.views'), disabled: true, cssClass: 'k-group-menu' },
                {
                    text: this.primeng.getTranslation('title.newView'),
                    click: () => {
                        const persistState: PersistStateItem = {
                            id: 0,
                            customerId: 0,
                            name: 'Basic',
                            primary: false,
                            displayOrder: 0,
                            persistType: this.gridConfig?.persistType
                        };
                        this.ptx.openPersistModelDialog(persistState);
                    }
                },
                { text: this.primeng.getTranslation('title.manageViews'), click: () => this.ptx.openPersistListDialog() }
            ];
            this.settingsMenuData.push(...persistStateMenuData);
        }

        if (this.customMenuData?.length) {
            this.settingsMenuData.push(...this.customMenuData);
        }

        this.settingsMenuEnable = this.settingsMenuData.length > 0;
    }

    // ---- Utility
    public get rightSeparatorEnable(): boolean {
        return this.insertCommandEnable || this.deleteCommandEnable;
    }
}
