import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrService } from 'ngx-toastr';      

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css']
})
export class EmpFormComponent implements OnInit {

  constructor(private apiService: ApiServiceService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRouter: ActivatedRoute) { }
  flag: boolean = false;
  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe(params=>{
      if(params.get('action')){
        this.flag = true;
      }
      else{
        this.flag = false;
        this.getEmployee(params.get('id'));
      }
    })
  }
  submit: boolean = false;
  empForm = new FormGroup({
    "employee_name" : new FormControl('', [Validators.required]),
    "employee_salary" : new FormControl('', [Validators.required]),
    "employee_age" : new FormControl('' ,[Validators.required]),
    "profile_image" : new FormControl('')
  })
  get form()
  {
    return this.empForm.controls;
  }
  validateDate(dt): any{
    var dob = new Date(dt);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970); 
    if(age>18){
      this.empForm.controls.employee_age.setValue(age);
      return true;
    }
    else{
      return false;
    }
  }
  post()
  {
    if(!this.empForm.valid){
      this.toastr.error("Please enter valid data!!!",'Error');
      this.submit=true;
    }
    else{
      this.apiService.postData(this.empForm.value).subscribe(response=>{
        if(response.status===201){
          console.log(response);
          this.empForm.reset();
          this.submit = false;
          this.toastr.success("Data created successfully!!!",'Success');
          this.router.navigate(['/display'], {queryParams: {action: 'get'}});
        }
      }, (error) =>{
        this.toastr.error("Server is not responding, Please try again later!!!",'Error');
      })
    }
  }
  getEmployee(id)
  {
    this.apiService.getSingleData(id).subscribe(response=>{
      if(response.status===200){
        this.toastr.success("Data fetched successfully",'Success');
        this.empForm.patchValue({
          employee_name : response['body']['data'].employee_name,
          employee_salary : response['body']['data'].employee_salary,
          employee_age : response['body']['data'].employee_age
        })
      }
    }, (error)=>{
      //429
      this.toastr.error("Server is busy, Please try again later!!!",'Error');
    })
  }
  put()
  {
    this.submit = true;
    if(this.empForm.valid){
      this.apiService.putData(this.empForm.value).subscribe(response=>{
        if(response.status===200){
          console.log(response);
          this.toastr.success("Data updated successfully!!!",'Success');
        }
      }, (error)=>{
        this.toastr.error("Server is busy, Please try again later!!!");
      })
      this.router.navigate(['/display'], {queryParams: {action: 'get'}});
      this.empForm.reset();
    }
  }
}
