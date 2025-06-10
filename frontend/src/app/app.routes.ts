import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'analytics', component: Dashboard },
  { path: 'reports', component: Dashboard },
  { path: 'notifications', component: Dashboard },
  { path: 'users', component: Dashboard },
  { path: 'settings', component: Dashboard },
  { path: 'security', component: Dashboard }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
