import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const LANGUAGE_ROUTES: Routes = [    
    {
        path: 'language',
        loadComponent: () => import('./language-list').then((c) => c.LanguageListComponent)
    },
    {
        path: 'language/:id',
        loadComponent: () => import('./language-edit').then((c) => c.LanguageEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];