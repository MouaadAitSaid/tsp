import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { MaterialModule } from './material.module';

import { LoginComponent } from './pages/login/login.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { GenericTableComponent } from './generic/ui/generic-table/generic-table.component';
import { UserDialogComponent } from './pages/user-dialog/user-dialog.component';
import {authInterceptor} from './utils/auth.interceptor';
import {TaskManagementComponent} from './pages/task-management/task-management.component';

@NgModule({
  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])), // Nouvelle méthode pour HttpClient avec Angular 16+
  ],
  declarations: [
    AppComponent,
    GenericTableComponent,
    UserManagementComponent,
    UserDialogComponent,
    LoginComponent,
    TaskManagementComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
