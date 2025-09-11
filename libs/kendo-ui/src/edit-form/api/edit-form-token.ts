// grid-token.ts
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IEditFormToken {
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

// Create a custom injection token for the grid component.
export const EDIT_FORM_TOKEN = new InjectionToken<IEditFormToken>('EditFormToken');
