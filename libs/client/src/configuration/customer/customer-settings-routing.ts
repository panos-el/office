import { Routes } from "@angular/router";
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const CUSTOMER_SETTINGS_ROUTES: Routes = [    
    {
        path: 'customer-settings',
        loadComponent: () => import('./customer-settings-edit').then((c) => c.CustomerSettingsEditComponent),
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];