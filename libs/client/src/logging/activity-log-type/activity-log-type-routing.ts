import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const ACTIVITY_LOG_TYPE_ROUTES: Routes = [    
    {
        path: 'activity-log-type',
        loadComponent: () => import('./activity-log-type-list').then((c) => c.ActivityLogTypeListComponent)
    },
    {
        path: 'activity-log-type/:id',
        loadComponent: () => import('./activity-log-type-edit').then((c) => c.ActivityLogTypeEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard],
        providers: [KendoEditFormContextService]
    },
];