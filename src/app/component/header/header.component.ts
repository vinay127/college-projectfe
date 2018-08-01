import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Routes, Router, RouterModule } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class Header implements OnInit{
  localStorage: CookieService;
  isValidUser = false;
  isUser = false;
  constructor(private _http: Http, private router: Router, localStorage: CookieService, private toastrService : ToastrService) {
    this.localStorage = localStorage;
  }

  ngOnInit(){
    this.isLoggedIn();
    this.isUserLoggedIn();
    
  }

  onLogout() {
    this.localStorage.set('token', null);
    this.localStorage.set('role', null);
    this.router.navigate(['/login']);
    this.toastrService.success("Successfully logged out")
  }

  
  isUserLoggedIn() {
    if (this.localStorage.get('role') == 'User') {
      console.log("role :",this.localStorage.get('role'))
      this.isUser = true;
    } else {
      this.isUser = false;
    }
  }
  isLoggedIn() {
    console.log("value : ",this.localStorage.get('token') )
    if (this.localStorage.get('token').length>0) {
      console.log("logged in true ")
      this.isValidUser = true;
    } else {
      console.log("logged in false ")
      this.isValidUser = false;
    }

  }
}