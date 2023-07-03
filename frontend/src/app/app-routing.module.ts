import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { PrivateRouteGuard } from './guards/private-route.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [PrivateRouteGuard],
    data: { requiresAuthentication: true }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PrivateRouteGuard],
    data: { requiresAuthentication: false }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PrivateRouteGuard],
    data: { requiresAuthentication: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
