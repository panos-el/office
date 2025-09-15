import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const CURRENCY_ROUTES: Routes = [   
    {
        path: 'currency',
        loadComponent: () => import('./currency-list.component').then((c) => c.CurrencyListComponent)
    },
    {
        path: 'currency/:id',
        loadComponent: () => import('./currency-edit.component').then((c) => c.CurrencyEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard],
        providers: [KendoEditFormContextService]
    },
];