import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './shared/service/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuardService] },
  { path: 'add-job', loadChildren: () => import('./add-job/add-job.module').then(m => m.AddJobModule), canActivate: [AuthGuardService] },
  { path: 'add-job/:id', loadChildren: () => import('./add-job/add-job.module').then(m => m.AddJobModule), canActivate: [AuthGuardService] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
