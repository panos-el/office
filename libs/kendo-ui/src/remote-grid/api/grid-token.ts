// grid-token.ts
import { InjectionToken } from '@angular/core';

export interface IGridToken {
    reloadData(): Promise<void>;
    clearSelectedKeys(): void;
    getSelectedKeys(): number[];
}

// Create a custom injection token for the grid component.
export const GRID_TOKEN = new InjectionToken<IGridToken>('GridToken');
