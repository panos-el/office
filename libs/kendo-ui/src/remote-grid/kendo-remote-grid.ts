import { Component, Directive, Injectable, inject, Input, OnInit, TemplateRef, Output, EventEmitter, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
// import { isPresent } from '@progress/kendo-angular-common';
import { FilterExpression, KENDO_FILTER } from "@progress/kendo-angular-filter";
import { CellClickEvent, ColumnMenuSettings, DataStateChangeEvent, GridComponent, GridDataResult, GroupableSettings, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, KENDO_GRID_PDF_EXPORT } from '@progress/kendo-angular-grid';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_INDICATORS } from "@progress/kendo-angular-indicators";
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import {
    SVGIcon, fileExcelIcon, filePdfIcon, menuIcon, filterIcon, gearIcon,
    minusOutlineIcon, checkOutlineIcon, displayInlineFlexIcon, pencilIcon, 
    saveIcon
} from "@progress/kendo-svg-icons";
import { IntlModule, IntlService } from '@progress/kendo-angular-intl';
import { AggregateDescriptor, CompositeFilterDescriptor, DataSourceRequestState, State, toDataSourceRequestString, translateDataSourceResultGroups } from '@progress/kendo-data-query';
import { PrimeNG } from 'primeng/config';

import { BASE_URL, ClientDataService, DialogResultEnum, isIsoDateString, ListFormOptions, menuAnimation, stateAnimation, stringFormat } from '@office/core';
import { GridConfig, GridSettings, KendoGridToken, PersistStateItem, mapDateFilter } from './api/public_api';
import { SearchBoxComponent } from '../search-box/search-box';
import { ConfirmationDialogService } from '../confirmation-dialog/public_api';
import { PersistStateContextService } from './persist-state-ctx.service';
import { PersistStateService } from './persist-state.service';
import { ConfirmationDialogOptions } from '../confirmation-dialog/confirmation-dialog.component';
import { StickyGridHeaderDirective } from '../directives/public_api';

@Injectable()
export class KendoRemoteGridContextService {
    public grid!: KendoRemoteGridComponent;

    // public clear(): void {
    //     if (!this.filter || this.filter.filters?.length === 0) {
    //         return;
    //     }
    //     this.filter = { logic: 'and', filters: [] }
    //     this.popupRef.instance.filter = cloneFilters(this.filter);
    //     this.filterService.filter(this.filter);
    //     this.close.emit();
    // }

}

@Directive({
    selector: '[kendoRemoteGridDirective]',
    standalone: true
})
export class KendoRemoteGridDirective implements OnInit {
    protected context = inject(KendoRemoteGridContextService);
    // private clientDataService = inject(ClientDataService);
    // private baseUrl = inject(BASE_URL);

    public ngOnInit(): void {
        this.context.grid.remoteGridDirective = this;

        this.context.grid.applyProperties();
    }
}

@Component({
    selector: "kendo-remote-grid",
    templateUrl: "./kendo-remote-grid.html",
    providers: [
        { provide: KendoGridToken, useExisting: KendoRemoteGridComponent },
        PersistStateContextService, PersistStateService, KendoRemoteGridContextService
    ],
    animations: [menuAnimation, stateAnimation],
    imports: [
        CommonModule, IntlModule, RouterModule,
        KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, KENDO_GRID_PDF_EXPORT, KENDO_BUTTONS, KENDO_FILTER,
        KENDO_ICONS, KENDO_INPUTS, KENDO_INDICATORS,
        StickyGridHeaderDirective, KendoRemoteGridDirective, SearchBoxComponent
    ]
})
export class KendoRemoteGridComponent extends KendoGridToken implements OnInit  {
    @ViewChild(GridComponent) public grid!: GridComponent;
    @Input() buttonTemplates!: { [key: string]: TemplateRef<any> }; // Dynamic templates
    @Input() animate: boolean = true;
    @Input() formOptions!: ListFormOptions;
    @Input() aggregatable = false;
    @Input() aggregateDescriptors!: AggregateDescriptor[];
    @Input() aggregateTemplates!: { [key: string]: TemplateRef<any> }; // Dynamic templates

    @Input() pageTitleEnable: boolean = true;
    @Input() filterCommandEnable: boolean = true;
    @Input() columnChooserCommandEnable: boolean = true;
    @Input() insertCommandEnable: boolean = true;
    @Input() deleteCommandEnable: boolean = true;

    // SettingsMenu
    @Input() gridMenuEnable: boolean = true;
    @Input() persistStateMenuEnable: boolean = true;
    settingsMenuEnable!: boolean
    settingsMenuData: any[] = [];
    @Input() customMenuData!: any[];

    // Selectable    
    @Input() checkboxColumnEnable: boolean = true;
    @Input() showSelectAllEnable: boolean = true;
    @Input() dataKey: string = 'id';
    @Input() selectedKeys: any[] = [];

    // Other
    @Input() gridHeight!: number;
    @Input() resizable: boolean = true;
    @Input() reorderable: boolean = true;
    @Input() columnMenu: ColumnMenuSettings | boolean = false;
    @Input() dblClickEnable: boolean = true;
    @Input() landscape: boolean = false;
    @Input() excelExportAllEnable: boolean = true;

    // svg-icons    
    filePdfIcon: SVGIcon = filePdfIcon;
    fileExcelIcon: SVGIcon = fileExcelIcon;
    menuIcon: SVGIcon = menuIcon;
    filterIcon: SVGIcon = filterIcon;
    gearIcon: SVGIcon = gearIcon;
    checkOutlineIcon: SVGIcon = checkOutlineIcon;
    minusOutlineIcon: SVGIcon = minusOutlineIcon;
    displayInlineFlexIcon: SVGIcon = displayInlineFlexIcon;

    //quickSearch
    @Input() quickSearchEnable: boolean = true;
    quickSearch: string = "";

    // Commands
    @Input() excelCommandEnable: boolean = true;
    @Input() pdfCommandEnable: boolean = true;

    // Filters
    filterPanelVisible: boolean = false;
    filterExpressions!: FilterExpression[];
    filterPanelValue!: CompositeFilterDescriptor // { logic: "and", filters: [] };

    remoteGridDirective!: KendoRemoteGridDirective;

    @Input() loading: boolean = false;
    gridConfig!: GridConfig;
    gridData!: GridDataResult;
    state!: State; // { skip: 0, take: 100, group: [], filter: { filters: [], logic: "or" }, sort: [] };
    columns!: any[];

    _columnMenuSettings: ColumnMenuSettings = {
        sort: false,
        lock: true,
        stick: true,
        columnChooser: false,
        autoSizeColumn: true
    };
    public columnMenuSettings: boolean | ColumnMenuSettings = false;

    private clientDataService = inject(ClientDataService);
    private baseUrl = inject(BASE_URL);
    private primeng = inject(PrimeNG);
    private router = inject(Router);
    private intlService = inject(IntlService);
    private toastrService = inject(ToastrService);

    // Labels
    trueLabel!: string;
    falseLabel!: string;
    applyFilterLabel!: string;
    autofitColumnsLabel!: string;
    insertLabel!: string;
    deleteLabel!: string;
    settingsMenuLabel!: string;

    // Emmiters    
    @Output() public gridConfigChange: EventEmitter<GridConfig> = new EventEmitter();

    public trackByItem(index: number/* , item: GridItem */): any {
        return index;
        //return item.data[this.config.dataKey];
    }

    public groupHeaderTemplate(value: any) {
        if (typeof value === 'boolean')
            return value ? this.trueLabel : this.falseLabel;
        if (typeof value === 'string' && isIsoDateString(value)) {
            return this.intlService.formatDate(new Date(value), 'd');
        }

        return value;
    }

    public toggleColumnMenu() {
        this.columnMenuSettings = (typeof this.columnMenuSettings === "boolean") ? this._columnMenuSettings : false;
    }

    get rightSeparatorEnable() {
        return this.insertCommandEnable || this.deleteCommandEnable;
    }

    constructor(
        private dialogService: ConfirmationDialogService,
        private ptx: PersistStateContextService,
        private ctx: KendoRemoteGridContextService) {
        super();
        this.ptx.grid = this;
        this.ctx.grid = this;
    }

    ngOnInit(): void {
        this.trueLabel = this.primeng.getTranslation('aria')['trueLabel'];
        this.falseLabel = this.primeng.getTranslation('aria')['falseLabel'];
        this.insertLabel = this.primeng.getTranslation('common.insert');
        this.deleteLabel = this.primeng.getTranslation('common.delete');
        this.autofitColumnsLabel = this.primeng.getTranslation('grid.autofitCulumns');
        this.settingsMenuLabel = this.primeng.getTranslation('common.settings');
        this.applyFilterLabel = this.primeng.getTranslation('common.apply');
        
        if (this.gridMenuEnable) {
            const gridMenuData: any = [
                { text: this.primeng.getTranslation('common.configuration'), disabled: true, cssClass: "k-group-menu" },
                { text: this.primeng.getTranslation('grid.showGroup'), click: () => { 
                        const groupable = this.gridConfig.groupable as GroupableSettings;
                        if (groupable) {
                            groupable.enabled = !groupable.enabled;
                        }
                    } 
                },
                { text: this.primeng.getTranslation('grid.columnMenu'), click: () => { this.toggleColumnMenu(); } },
                { text: this.primeng.getTranslation('grid.clearSelections'), click: () => { this.clearSelectedKeys(); } }
            ];

            this.settingsMenuData.push(...gridMenuData);
        }

        if (this.persistStateMenuEnable) {
            const persistStateMenuData: any = [
                { text: this.primeng.getTranslation('grid.views'), disabled: true, cssClass: "k-group-menu" },
                { text: this.primeng.getTranslation('title.newView'), svgIcon: saveIcon, click: () => { 
                    const persistState: PersistStateItem = { id: 0, customerId: 0, name: "Basic", primary: false, displayOrder: 0, persistType: this.gridConfig.persistType }
                    this.ptx.openPersistModelDialog(persistState); } 
                },
                { text: this.primeng.getTranslation('title.manageViews'), svgIcon: pencilIcon, click: () => { this.ptx.openPersistListDialog(); } }
            ];

            this.settingsMenuData.push(...persistStateMenuData);
        }

        if(this.customMenuData && this.customMenuData.length > 0) {
            this.settingsMenuData.push(...this.customMenuData);
        }

        this.settingsMenuEnable = this.settingsMenuData.length > 0;
    }

    public applyProperties() {

        const url = `${this.baseUrl}${this.formOptions.propertiesUrl}`;

        this.loading = true;
        this.clientDataService.fetchJsonBodyGet<GridConfig>(url)
            .then((config) => {
                this.gridConfig = config;
                
                this.applyGridSettings();

                this.gridConfigChange.emit(config);

                this.applyDataSource();
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.loading = false);
    }

    public applyDataSource(): Promise<void> {
        if (this.aggregatable && this.aggregateDescriptors.length > 0)
            (this.state as DataSourceRequestState)["aggregates"] = this.aggregateDescriptors;

        const url = `${this.baseUrl}${this.formOptions.propertiesUrl}?${toDataSourceRequestString(this.state)}`;
        const hasGroups = this.state.group && this.state.group.length;

        this.loading = true;
        return this.clientDataService.fetchJsonBodyPost<GridDataResult>(url, {}, { quickSearch: this.quickSearch })
            .then(({ data, total/*, aggregateResults*/ }) => {
                const gridData = {
                    // If the data is grouped, translate it to a compatible format using the translateDataSourceResultGroups helper.
                    data: hasGroups ? translateDataSourceResultGroups(data) : data,
                    total: total,
                    //aggregateResult: translateAggregateResults(aggregateResults)
                };
                this.gridData = {
                    data: gridData.data,
                    total: gridData.total
                };
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.loading = false);
    }

    reloadData(): Promise<void> {
        return this.applyDataSource();
    }

    public applyGridSettings() {
        const config = JSON.parse(this.gridConfig.token) as GridSettings;

        mapDateFilter(config.state.filter, config.columns);

        this.columns = config.columns.sort((a, b) => a.orderIndex - b.orderIndex);
        this.applyfilterExpressions();
        this.applyState(config.state);
    }

    onDataStateChange(event: DataStateChangeEvent) {
        this.applyState(event);
        this.applyDataSource();
    }

    applyState(state: State | DataStateChangeEvent) {
        this.state = {
            skip: state.skip,
            take: state.take,
            sort: state.sort,
            group: state.group,
            filter: state.filter
        };
    }

    public applyfilterExpressions() {
        const filterExpressions: FilterExpression[] = this.columns
            .filter(x => x.filterable)
            .map(x => {
                return {
                    field: x.field,
                    title: x.title,
                    editor: x.filter === 'text' ? 'string' : x.filter === 'numeric' ? 'number' : x.filter
                };
            });

        this.filterExpressions = filterExpressions;
    }
    // CRUD
    public insertCommand() {
        this.router.navigate([this.formOptions.pathUrl, 0]);
    }

    public deleteCommand() {
        const options: ConfirmationDialogOptions = {
            message: stringFormat(this.primeng.getTranslation('message.deleteSelection'), this.selectedKeys.length),
            titleColor: "#d51923"
        };

        this.dialogService.open(options).then((result) => {                
                if (result == DialogResultEnum.Yes) {
                    if (this.formOptions.deleteSelectedUrl && this.selectedKeys.length > 1) {
                        this.deleteEntityCore(`${this.baseUrl}${this.formOptions.deleteSelectedUrl}`, this.selectedKeys);
                    }
                    if (this.formOptions.deleteUrl && this.selectedKeys.length === 1) {
                        this.deleteEntityCore(`${this.baseUrl}${this.formOptions.deleteUrl}`, this.selectedKeys[0]);
                    }
                }
        });
    }

    private deleteEntityCore(apiUrl: string, value: number | Array<number>): void {

        const { url, body, params } = Array.isArray(value)
            ? { url: apiUrl, body: this.selectedKeys, params: undefined }
            : { url: apiUrl, body: {}, params: { id: this.selectedKeys[0] } };

        this.loading = true;
        this.clientDataService.fetchJsonBodyPost(url, body, params)
            .then((result: any) => {
                this.applyDataSource().then(() => {
                    this.clearSelectedKeys();
                    this.toastrService.success(result?.info || this.primeng.getTranslation('message.deletionCompleted'));
                });
            })
            .catch((error: Error) => {
                Promise.reject(error);
            }).finally(() => this.loading = false);
    }

    // QuickSearch
    public onQuickSearchValueChange(value: any) {
        this.state.skip = 0;
        this.quickSearch = value;

        // Refresh the data
        this.applyDataSource();
    }

    // Filter
    public applyFilter(value: CompositeFilterDescriptor): void {
        this.state.skip = 0;
        this.state.filter = value;

        // Refresh the data
        this.applyDataSource();
    }
    public toggleFilterPanel() {
        if (!this.filterPanelVisible) {
            const filter = { ...this.state.filter };
            this.filterPanelValue = filter as CompositeFilterDescriptor;
        }
        this.filterPanelVisible = !this.filterPanelVisible;
    }

    public get filterExist(): boolean {
        return (this.state?.filter?.filters?.length as number) > 0;
    }

    // Selection
    public getSelectedKeys(): any[] {
        return this.selectedKeys;
    }
    public clearSelectedKeys(): void {
        this.selectedKeys = [];
    }

    // Events    
    public onColumnReorder(e: any): void {
        const reorderedColumn = this.columns.splice(e.oldIndex, 1);
        this.columns.splice(e.newIndex, 0, ...reorderedColumn);
    }

    public onColumnResize(e: any): void {
        e.forEach((item: any) => {
            this.columns.find(
                (col) => col.field === item.column.field
            ).width = item.newWidth;
        });
    }

    public onColumnVisibilityChange(e: any): void {
        e.columns.forEach((column: any) => {
            this.columns.find(
                (col) => col.field === column.field
            ).hidden = column.hidden;
        });
    }

    // DblClick
    private cellClickEvent!: CellClickEvent;
    public onCellClick(event: CellClickEvent) {
        if (event.type == 'click')
            this.cellClickEvent = event;
    }

    public onDblClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const exist = target.closest('.k-grid-checkbox-column') || target.closest('.k-button');

        const closest = (node: any, predicate: any) => {
            while (node && !predicate(node)) {
                node = node.parentNode;
            }

            return node;
        };

        const content = (node: any) => {
            return node.classList?.contains('k-grid-content');
        };

        if (this.dblClickEnable && this.cellClickEvent && !exist) {

            if (closest(event.target as HTMLElement, content)) {
                this.router.navigate([this.formOptions.pathUrl, this.cellClickEvent.dataItem[this.dataKey]]);
            }
        }
    }

    // Exports
    public excelExportAll = (): ExcelExportData | Promise<ExcelExportData> => {
        const result: ExcelExportData = {
            data: this.gridData.data,
            group: this.state.group
        };

        if (this.excelExportAllEnable) {

            return new Promise<ExcelExportData>((resolve, reject) => {
                const state = Object.assign({}, this.state, { skip: 0, take: 1000000 });                
                const url = `${this.baseUrl}${this.formOptions.propertiesUrl}?${toDataSourceRequestString(state)}`;
                const hasGroups = state.group && state.group.length;

                this.loading = true;            
                return this.clientDataService.fetchJsonBodyPost<GridDataResult>(url, {}, { quickSearch: this.quickSearch })
                    .then(({ data, total/*, aggregateResults*/ }) => {
                        const gridData = {
                            // If the data is grouped, translate it to a compatible format using the translateDataSourceResultGroups helper.
                            data: hasGroups ? translateDataSourceResultGroups(data) : data,
                            total: total,
                            //aggregateResult: translateAggregateResults(aggregateResults)
                        };
                        
                        result.data = gridData.data;
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    }).finally(() => this.loading = false);
            });
        }

        return result;
    }

}