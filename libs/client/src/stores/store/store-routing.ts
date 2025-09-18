import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const STORE_ROUTES: Routes = [    
    {
        path: 'store',
        loadComponent: () => import('./store-list').then((c) => c.StoreListComponent)
    },
    {
        path: 'store/:id',
        loadComponent: () => import('./store-edit').then((c) => c.StoreEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard], 
        providers: [KendoEditFormContextService]
    },
];