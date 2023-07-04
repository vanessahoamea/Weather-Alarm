import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivateRouteGuard } from './guards/private-route.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
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
