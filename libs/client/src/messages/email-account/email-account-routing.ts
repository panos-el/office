import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const EMAIL_ACCOUNT_ROUTES: Routes = [    
    {
        path: 'email-account',
        loadComponent: () => import('./email-account-list').then((c) => c.EmailAccountListComponent)
    },
    {
        path: 'email-account/:id',
        loadComponent: () => import('./email-account-edit').then((c) => c.EmailAccountEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard], 
        providers: [KendoEditFormContextService]
    },
];