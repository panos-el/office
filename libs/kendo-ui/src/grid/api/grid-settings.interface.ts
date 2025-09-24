import { State } from "@progress/kendo-data-query";
import { ColumnSettings } from "./column-settings.interface";

export interface GridSettings {
    state: State;
    columns: ColumnSettings[];
}