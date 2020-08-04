import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: any;
  isTableHasData: boolean = true;

  public displayedColumns = ['position', 'jobtitle', 'jobdescription', 'status', 'jobTypes', 'StartTime', 'EndTime', 'action'];
  dataSource = new MatTableDataSource(this.items);
  

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      window.location.reload();
    }, 300000);
    this.getAllJobs();
  }

  getAllJobs(){
    this.api.getAllJobs().subscribe((res:any) => {
      if(res){
        console.log("res", res);
        this.items = res;
        this.dataSource = new MatTableDataSource(this.items);
      }
    })
  }

  public applyFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }
  
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

  delete(id){
    this.api.deleteJob(id).subscribe((res:any) => {
      if(res){
        alert("Job Deleted Successfully!")
      }
    });
  }
 
  edit(id){
    console.log("element._id",id)
    this.router.navigateByUrl('add-job/'+id)
  }
}

