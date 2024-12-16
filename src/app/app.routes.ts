import {UserManagementComponent} from './pages/user-management/user-management.component';
import {LoginComponent} from './pages/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './utils/auth.guard';
import {NgModule} from '@angular/core';
import {TaskManagementComponent} from './pages/task-management/task-management.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['SUPERADMIN'] }, // Accessible uniquement aux SUPERADMIN
  },
  {
    path: 'task-management',
    component: TaskManagementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER'] }, // Accessible uniquement aux MANAGER
  },
  { path: '**', redirectTo: 'login' }, // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
