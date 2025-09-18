import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const MESSAGE_TEMPLATE_ROUTES: Routes = [    
    {
        path: 'message-template',
        loadComponent: () => import('./message-template-list').then((c) => c.MessageTemplateListComponent)
    },
    {
        path: 'message-template/:id',
        loadComponent: () => import('./message-template-edit').then((c) => c.MessageTemplateEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard], 
        providers: [KendoEditFormContextService]
    },
];