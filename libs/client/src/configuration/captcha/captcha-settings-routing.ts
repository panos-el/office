import { Routes } from "@angular/router";
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const CAPTCHA_SETTINGS_ROUTES: Routes = [   
    {
        path: 'captcha-settings',
        loadComponent: () => import('./captcha-settings-edit').then((c) => c.CaptchaSettingsEditComponent),
        canDeactivate: [canDeactivateGuard], 
        providers: [CanDeactivateService]
    },
];