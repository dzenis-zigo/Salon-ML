import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './admin-login/forgot-password/forgot-password.component';
import { LoginComponent } from './admin-login/login/login.component';
import { NewPasswordComponent } from './admin-login/new-password/new-password.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'admin-test', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'new-password/:userId/:token', component: NewPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
