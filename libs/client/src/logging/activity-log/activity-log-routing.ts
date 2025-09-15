import { Routes } from "@angular/router";

export const ACTIVITY_LOG_ROUTES: Routes = [    
    {
        path: 'activity-log',
        loadComponent: () => import('./activity-log-list').then((c) => c.ActivityLogListComponent)
    },
];