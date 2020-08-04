import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userID: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userId')
  }

  clickEvent(){

  }

  logout(){
    this.userID = localStorage.getItem('userId');
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
  
}
