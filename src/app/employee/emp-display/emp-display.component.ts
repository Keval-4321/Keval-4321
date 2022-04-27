import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-emp-display',
  templateUrl: './emp-display.component.html',
  styleUrls: ['./emp-display.component.css']
})
export class EmpDisplayComponent implements OnInit {
  page:any = 1;
  pageSize = 2;
  flag:boolean = false;
  myObj;
  constructor
  (
    private apiService: ApiServiceService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
        this.get();
  }
  get()
  {
  this.apiService.getData().subscribe(response => {
    if(response.status === 200)
    {
      this.flag = true;
      this.myObj = response;
      this.toastr.success("Data fetched successfully!",'Success');
    }
    }, (error) =>{
        this.flag = false;
        this.toastr.error("Server is busy, Please try again later!",'Error');
    })
}

  delete(id)
  {
    this.apiService.deleteData(id).subscribe(res=>{
      console.log(res);
      this.toastr.success("Data deleted successfully!!!",'Success');
    })
  }
  updtUser(id)
  {
    this.router.navigate(['/form'], {queryParams: {id: id}});
  }
}
