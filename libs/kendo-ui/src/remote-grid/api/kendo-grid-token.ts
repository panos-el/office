import { InjectionToken } from '@angular/core';

export interface IKendoGridToken {
    reloadData(): Promise<void>;
    clearSelectedKeys(): void;
    getSelectedKeys(): number[];
}

// Create a custom injection token for the grid component.
export const KENDO_GRID_TOKEN = new InjectionToken<IKendoGridToken>('KendoGridToken');