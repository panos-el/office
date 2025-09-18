import { Routes } from "@angular/router";
import { CanActivateEditFormGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';

export const SCHEDULE_TASK_ROUTES: Routes = [    
    {
        path: 'schedule-task',
        loadComponent: () => import('./schedule-task-list').then((c) => c.ScheduleTaskListComponent)
    },
    {
        path: 'schedule-task/:id',
        loadComponent: () => import('./schedule-task-edit').then((c) => c.ScheduleTaskEditComponent),
        canActivate: [CanActivateEditFormGuard],
        canDeactivate: [canDeactivateGuard], 
        providers: [KendoEditFormContextService]
    },
];