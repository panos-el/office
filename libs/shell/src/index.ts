import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { ShellLayout } from './shell-layout/shell-layout';
import { LoginComponent } from './login/login.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellLayout,
    children: [
      {
        path: 'landing',
        component: Landing
      },
      {
        path: 'login',
        component: LoginComponent
      },
      { 
        path: 'not-found', 
        loadComponent: () => import('./not-found/not-found').then((c) => c.Notfound) 
      },
      { 
        path: '', 
        redirectTo: 'landing', pathMatch: 'full' 
      },
      { path: '**', redirectTo: '/not-found' }
    ]
  }
];