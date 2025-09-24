import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const PERMISSION_RECORD_ROUTES: Routes = [    
    {
        path: 'permission-record',
        loadComponent: () => import('./permission-record-list').then((c) => c.PermissionRecordListComponent)
    },
    {
        path: 'permission-record/:id',
        loadComponent: () => import('./permission-record-edit').then((c) => c.PermissionRecordEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];