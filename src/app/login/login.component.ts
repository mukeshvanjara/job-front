import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;

  constructor(private route: Router, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get fval() { return this.userLogin.controls }

  login(){

    if(this.userLogin.invalid){
      return;
    }
    let json = {
      "email": this.userLogin.controls.email.value,
      "password": this.userLogin.controls.password.value,
    }

    this.api.login(json).subscribe((res: any) =>{
      if(res){
        console.log("res", res);
        localStorage.setItem('userId', res._id)
        this.route.navigateByUrl('/dashboard');
      }
    })
  }
}
