import { CellRowspanFn, ColumnSortSettings, FieldDataType } from "@progress/kendo-angular-grid";

export interface ColumnSettings {
    columnType?: string;
    autoSize?: boolean;
    cellRowspan?: boolean | CellRowspanFn;
    columnMenu?: boolean; // true
    class?: string | string[] | Set<string> | { [key: string]: any };
    editable?: boolean; // true
    editor?: FieldDataType; // 'text'
    field?: string;
    filter?: FieldDataType; // 'text'
    filterable?: boolean; // true
    filterClass?: string | string[] | Set<string> | { [key: string]: any };
    filterStyle?: { [key: string]: string };
    footerClass?: string | string[] | Set<string> | { [key: string]: any };
    footerStyle?: { [key: string]: string };
    format?: any;
    groupable?: boolean; // true
    headerClass?: string | string[] | Set<string> | { [key: string]: any };
    headerStyle?: { [key: string]: string };
    hidden?: boolean; // false
    includeInChooser?: boolean; // true
    lockable?: boolean; // true
    locked?: boolean; // false
    maxResizableWidth?: number;
    media?: string;
    minResizableWidth?: number; // 60
    reorderable?: boolean; // true
    resizable?: boolean; // true
    sortable?: boolean | ColumnSortSettings; // true
    stickable?: boolean; // true
    sticky?: boolean; // false
    style?: { [key: string]: string };
    tableCellsRole?: string; // "gridcell"
    title?: string;
    width?: number;
    orderIndex: number;
}
/*
    autoSize boolean
    cellRowspan boolean | CellRowspanFn
    columnMenu boolean true
    class string | string[] | Set<string> | {[key: string]: any}
    editable boolean true
    editor FieldDataType 'text'
    field string
    filter FieldDataType 'text'
    filterable boolean true
    filterClass string | string[] | Set<string> | {[key: string]: any}
    filterStyle {[key: string]: string}
    footerClass string | string[] | Set<string> | {[key: string]: any}
    footerStyle {[key: string]: string}
    format any
    groupable boolean true
    headerClass string | string[] | Set<string> | {[key: string]: any}
    headerStyle {[key: string]: string}
    hidden boolean false
    includeInChooser boolean true
    lockable boolean true
    locked boolean false
    maxResizableWidth number
    media string
    minResizableWidth number 10
    reorderable boolean true
    resizable boolean true
    sortable boolean | ColumnSortSettings true
    stickable boolean true
    sticky boolean false
    style {[key: string]: string}
    tableCellsRole string "gridcell"
    title string
    width number
*/