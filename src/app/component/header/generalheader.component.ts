import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Routes, Router, RouterModule } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'generalheader',
  templateUrl: './generalheader.component.html'
})
export class GeneralHeader {
  localStorage: CookieService;
  constructor(private _http: Http, private router: Router, localStorage: CookieService,private toastrService : ToastrService ) {
    this.localStorage = localStorage;
  }
  onLogout() {
    this.localStorage.set('token', null);
    this.localStorage.set('role', null);
    this.toastrService.success("Successfully logged out")
    this.router.navigate(['']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToHome() {
    this.router.navigate(['/product']);
  }
  
}