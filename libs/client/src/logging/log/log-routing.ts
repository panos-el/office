import { Routes } from "@angular/router";

export const LOG_ROUTES: Routes = [    
    {
        path: 'log',
        loadComponent: () => import('./log-list').then((c) => c.LogListComponent)
    },
];