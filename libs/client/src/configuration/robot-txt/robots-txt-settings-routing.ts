import { Routes } from "@angular/router";
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const ROBOTS_TXT_SETTINGS_ROUTES: Routes = [    
    {
        path: 'robots-txt-settings',
        loadComponent: () => import('./robots-txt-settings-edit').then((c) => c.RobotsTxtSettingsEditComponent),
        canDeactivate: [canDeactivateGuard],
        providers: [CanDeactivateService]
    },
];