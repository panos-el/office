import { Route } from '@angular/router';
import { CanMatchGuard } from '@office/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SHELL_ROUTES } from '@office/shell';

export const appRoutes: Route[] = [    
  ...SHELL_ROUTES,
  { path: 'client', loadChildren: () => import('@office/client').then((c) => c.CLIENT_ROUTES), canMatch: [CanMatchGuard] },
  { path: '**', redirectTo: '/not-found' }
];
