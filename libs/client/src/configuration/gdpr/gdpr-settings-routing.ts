import { Routes } from "@angular/router";
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const GDPR_SETTINGS_ROUTES: Routes = [    
    {
        path: 'gdpr-settings',
        loadComponent: () => import('./gdpr-settings-edit').then((c) => c.GdprSettingsEditComponent),
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];