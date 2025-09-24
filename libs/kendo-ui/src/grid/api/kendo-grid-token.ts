// import { InjectionToken } from '@angular/core';

// export interface IKendoGridToken {
//     reloadData(): Promise<void>;
//     clearSelectedKeys(): void;
//     getSelectedKeys(): number[];
// }

// export const KENDO_GRID_TOKEN = new InjectionToken<IKendoGridToken>('IKendoGridToken');

export abstract class KendoGridToken {
    abstract reloadData(): Promise<void>;
    abstract clearSelectedKeys(): void;
    abstract getSelectedKeys(): number[];
}
