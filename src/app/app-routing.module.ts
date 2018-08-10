import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { IndexGuard } from './guards/index/index.guard';
import { IndexDashboardComponent } from './components/dashboard/index-dashboard/index-dashboard.component';
import { SalesComponent } from './components/dashboard/sales/sales.component';
import { SignupComponent } from './components/dashboard/signup/signup.component';
import { ProductFormComponent } from './components/dashboard/product-form/product-form.component';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [IndexGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: IndexDashboardComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'product', component: ProductFormComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
