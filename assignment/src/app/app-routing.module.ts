import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EmployeeComponent } from './employee/employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home',canActivate : [AuthGuard],  component:  HomeComponent},
  { path: 'employee',canActivate : [AuthGuard], component:  EmployeeComponent},
  // { path: 'employee', canActivate: [AuthGuard], canActivateChild: [AuthGuard], component:  EmployeeComponent
  //     ,children: [
  //       { path: ':id',  component:  EmpDetailComponent ,
  //         resolve: {
  //                currentEmployee : EmpService
  //          }
  //       }
  //     ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
