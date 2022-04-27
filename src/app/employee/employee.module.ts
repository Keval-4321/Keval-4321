import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { EmpDisplayComponent } from './emp-display/emp-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  RouterModule, Routes } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes :  Routes = [
  {path: '', redirectTo : '/display', pathMatch: 'full'},
  {path: 'form', component: EmpFormComponent},
  {path: 'display', component: EmpDisplayComponent}
]
@NgModule({
  declarations: [
    EmpFormComponent,
    EmpDisplayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  providers: [
    ApiServiceService,
  ]
})
export class EmployeeModule { }
