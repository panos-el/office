import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const CUSTOMER_ROUTES: Routes = [    
    {
        path: 'customer',
        loadComponent: () => import('./customer-list').then((c) => c.CustomerListComponent)
    },
    {
        path: 'customer/:id',
        loadComponent: () => import('./customer-edit').then((c) => c.CustomerEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];