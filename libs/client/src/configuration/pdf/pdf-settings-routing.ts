import { Routes } from "@angular/router";
import { canDeactivateGuard, CanDeactivateService } from '@office/kendo-ui';

export const PDF_SETTINGS_ROUTES: Routes = [   
    {
        path: 'pdf-settings',
        loadComponent: () => import('./pdf-settings-edit').then((c) => c.PdfSettingsEditComponent),
        canDeactivate: [canDeactivateGuard], 
        providers: [CanDeactivateService]
    },
];