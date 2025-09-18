import { Routes } from "@angular/router";

export const ONLINE_ROUTES: Routes = [    
    {
        path: 'online-users',
        loadComponent: () => import('./online-list').then((c) => c.OnlineListComponent)
    },
];