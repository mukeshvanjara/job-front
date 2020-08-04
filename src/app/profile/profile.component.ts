import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
  userProfile: FormGroup;
  userID: string;

  constructor(private fb: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.userProfile = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    })

    this.getProfile()
  }

  get fval() { return this.userProfile.controls }

  getProfile(){
    this.userID = localStorage.getItem('userId')
    
    this.api.getUserDetails(this.userID).subscribe((res: any) =>{
      if(res){
        this.route.navigateByUrl('/profile');
        this.userProfile.controls['firstName'].setValue(res.firstName)
        this.userProfile.controls['lastName'].setValue(res.lastName)
        this.userProfile.controls['mobile'].setValue(res.mobile)
        this.userProfile.controls['email'].setValue(res.email)
        this.userProfile.controls['address'].setValue(res.address)
      }
    })
  }

  updateProfile(){
    let json = {
      "firstName":this.userProfile.controls.firstName.value,
      "lastName": this.userProfile.controls.lastName.value,
      "mobile": this.userProfile.controls.mobile.value,
      "email": this.userProfile.controls.email.value,
      "address":this.userProfile.controls.address.value,
    }
    this.api.userUpdate(this.userID, json).subscribe((res: any) =>{
        console.log("res", res)
        this.ngOnInit();
    });
  }
  
  logout(){
    localStorage.clear();
    this.route.navigateByUrl('/login')
  }
  
}
