import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule, ToastrService } from 'ngx-toastr';  

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "", loadChildren:()=> import('./employee/employee.module')
        .then(res => res.EmployeeModule)
      }
    ]),
    BrowserAnimationsModule,  
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
