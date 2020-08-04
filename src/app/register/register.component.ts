import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userRegister: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private userApi: ApiService) { }

  ngOnInit(): void {
    this.userRegister = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
  }

  get fval(){ return this.userRegister.controls }

  onSignUp(){
    console.log("sds")
  }

  register(){
    console.log("sds", this.userRegister.value);
    if(this.userRegister.invalid){
      return;
    }
    let json = {
      "firstName":this.userRegister.controls.firstName.value,
      "lastName": this.userRegister.controls.lastName.value,
      "mobile": this.userRegister.controls.mobile.value,
      "email": this.userRegister.controls.email.value,
      "address":this.userRegister.controls.address.value,
      "password": this.userRegister.controls.password.value,
      "cpassword":this.userRegister.controls.cpassword.value,
    }
    this.userApi.register(json).subscribe((res: any)  =>{
      if(res){
        console.log("res", res);
        localStorage.setItem('uername', res)
        this.router.navigateByUrl('/login');
      }
    }, err =>{
      console.log("err", err);
    })
  }
}
