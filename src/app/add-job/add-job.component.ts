import { Component, OnInit } from '@angular/core';
import { WeekDay } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  jonDetails: FormGroup;
  update: boolean = false;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  public timeSchedule = [
    {id: 'daily', name: 'Daily'},
    {id: 'weekly', name: 'Weekly'},
    {id: 'monthly', name: 'Monthly'},
  ]

  ngOnInit(): void {
    this.jonDetails = this.fb.group({
      jobtitle: ['', Validators.required],
      jobdescription: ['', Validators.required],
      jobType: ['', Validators.required],
    });

    this.getJobDetails(this.activeRoute.snapshot.params['id']);
  }

  get fval() { return this.jonDetails.controls }

  createJob(){
    if(this.jonDetails.invalid){
      return;
    }


    let json = {
      "jobtitle": this.jonDetails.controls.jobtitle.value,
      "jobdescription": this.jonDetails.controls.jobdescription.value,
      "jobType": this.jonDetails.controls.jobType.value,
    }
    console.log("json", json);
    if(this.update){
      this.api.jobUpdate(json, this.activeRoute.snapshot.params['id']).subscribe((res:any) =>{
        if(res){
          console.log("res", res);
          this.router.navigateByUrl('/dashboard');
        }
      })
    } else {
      this.api.createJob(json).subscribe((res:any) =>{
        if(res){
          console.log("res", res);
          this.router.navigateByUrl('/dashboard');
        }
      })
    } 
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

  getJobDetails(id){
    this.api.getJobsDetails(id).subscribe((res: any) =>{
      if(res){
        this.jonDetails.controls['jobtitle'].setValue(res.jobtitle)
        this.jonDetails.controls['jobdescription'].setValue(res.jobdescription)
        this.jonDetails.controls['jobType'].setValue(res.jobType)
        this.update = true;
      }
    })
  }
}
