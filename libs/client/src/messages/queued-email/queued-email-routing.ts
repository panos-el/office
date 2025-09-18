import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const QUEUED_EMAIL_ROUTES: Routes = [    
    {
        path: 'queued-email',
        loadComponent: () => import('./queued-email-list').then((c) => c.QueuedEmailListComponent)
    },
    {
        path: 'queued-email/:id',
        loadComponent: () => import('./queued-email-edit').then((c) => c.QueuedEmailEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard], 
        providers: [KendoEditFormContextService]
    },
];