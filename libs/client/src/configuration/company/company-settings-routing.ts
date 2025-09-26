import { Routes } from "@angular/router";
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const COMPANY_SETTINGS_ROUTES: Routes = [   
    {
        path: 'company-settings',
        loadComponent: () => import('./company-settings-edit').then((c) => c.CompanySettingsEditComponent),
        canDeactivate: [canDeactivateGuard], 
        providers: [CanDeactivateService]
    },
];