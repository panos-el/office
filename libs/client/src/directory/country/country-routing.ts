import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const COUNTRY_ROUTES: Routes = [    
    {
        path: 'country',
        loadComponent: () => import('./country-list').then((c) => c.CountryListComponent)
    },
    {
        path: 'country/:id',
        loadComponent: () => import('./country-edit').then((c) => c.CountryEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard], 
        providers: [KendoEditFormContextService]
    },
];