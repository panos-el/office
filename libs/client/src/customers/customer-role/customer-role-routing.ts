import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const CUSTOMER_ROLE_ROUTES: Routes = [    
    {
        path: 'customer-role',
        loadComponent: () => import('./customer-role-list').then((c) => c.CustomerRoleListComponent)
    },
    {
        path: 'customer-role/:id',
        loadComponent: () => import('./customer-role-edit').then((c) => c.CustomerRoleEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];