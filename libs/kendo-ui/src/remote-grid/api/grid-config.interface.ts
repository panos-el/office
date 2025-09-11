import { FilterableSettings, GroupableSettings, PagerSettings, SelectableSettings, SortSettings } from "@progress/kendo-angular-grid";

export interface GridConfig {
    title: string;
    pagable: boolean | PagerSettings;
    selectable: boolean | SelectableSettings;
    groupable: boolean | GroupableSettings;
    sortable: SortSettings;
    filterable: FilterableSettings;
    persistType: string;
    token: string;
    customProperties: any;
}