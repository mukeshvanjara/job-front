import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  //* get header
  getHeader() {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json')
    // header = header.set('Authorization', `Token ${this.getItem()}`)
    return { headers: header };
  }

   register(josn) {
    return this.http.post('http://localhost:4000/users/register/', josn)
      .pipe(map((res => {
        return res;
      })));
  }

  login(josn) {
    return this.http.post('http://localhost:4000/users/login/', josn)
      .pipe(map((res => {
        return res;
      })));
  }

  getUserDetails(id) {
    return this.http.get(`http://localhost:4000/users/getUserById/${id}/`)
      .pipe(map((res => {
        return res;
      })));
  }
  
  getAllUsers() {
    return this.http.get('http://localhost:4000/users/getAllUser', this.getHeader())
      .pipe(map((res => {
        return res;
      })))
  }

  userUpdate(id, json) {
    return this.http.put(`http://localhost:4000/users/${id}/update`, json, this.getHeader())
      .pipe(map((res => {
        return res;
      })))
  }

  createJob(json){
    return this.http.post('http://localhost:4000/job/createjob', json)
    .pipe(map((res => {
      return res;
    })));
  }

  getAllJobs() {
    return this.http.get('http://localhost:4000/jobs/getAllJobs', this.getHeader())
      .pipe(map((res => {
        return res;
      })))
  }

  deleteJob(id) {
    return this.http.delete(`http://localhost:4000/jobs/${id}/delete`, this.getHeader())
      .pipe(map((res => {
        return res;
      })))
  }
    
  getJobsDetails(id) {
    return this.http.get(`http://localhost:4000/jobs/getJobsById/${id}`)
      .pipe(map((res => {
        return res;
      })));
  }

  jobUpdate(json, id) {
    return this.http.put(`http://localhost:4000/jobs/${id}/update`, json, this.getHeader())
      .pipe(map((res => {
        return res;
      })))
  }
}
