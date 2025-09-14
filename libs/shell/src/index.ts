import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { ShellLayout } from './components/shell-layout/shell-layout';
import { LoginComponent } from './components/login/login.component';

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
      // {
      //   path: 'change-password',
      //   loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent)
      // },
      // {
      //   path: 'access-denied',
      //   loadComponent: () => import('./components/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
      // },
      { 
        path: 'not-found', 
        loadComponent: () => import('./components/not-found/not-found').then((c) => c.Notfound) 
      },
      { 
        path: '', 
        redirectTo: 'landing', pathMatch: 'full' 
      }
    ]
  }
];