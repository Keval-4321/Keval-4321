import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  postUrl = "https://reqres.in/api/";
  getUrl = "http://dummy.restapiexample.com/api/v1/"
  deleteUrl = "https://reqres.in/api/users/";
  putUrl = "https://reqres.in/api/update";

  constructor(private http: HttpClient) { }
  postData(form){
    return this.http.post(this.postUrl + 'users', form, {observe: 'response'} );
  }
  getData(){
    return this.http.get(this.getUrl + 'employees', {observe: 'response'}).pipe(map(response=>{
      return response;
    }))
  }
  getSingleData(id){
    return this.http.get(this.getUrl + 'employee/'+ id, {observe: 'response'}).pipe(map(response=>{
      return response;
    }))
  }
  deleteData(p){
    return this.http.delete(this.deleteUrl + p, {observe: 'response'});
  }
  putData(form){
    return this.http.put(this.putUrl, form, {observe: 'response'});
  }
}
