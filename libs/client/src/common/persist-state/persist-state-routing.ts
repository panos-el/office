import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const PERSIST_STATE_ROUTES: Routes = [    
    {
        path: 'persist-state',
        loadComponent: () => import('./persist-state-list').then((c) => c.PersistStateListComponent)
    },
    {
        path: 'persist-state/:id',
        loadComponent: () => import('./persist-state-edit').then((c) => c.PersistStateEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];