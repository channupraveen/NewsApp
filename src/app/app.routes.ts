import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DashboardLayoutComponent } from './layouts/login-layout/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authmodule/authmodule.module').then(m => m.AuthmoduleModule)
      }
    ]
  },
  {
    path: 'home',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];