import { FormsModule } from '@angular/forms';
import { User } from './../../model/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { CoolStorageModule } from 'angular2-cool-storage';
import { Routes , Router ,  RouterModule} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})


export class LoginComponent implements OnInit {

    user =new  User;
    constructor(private loginService: LoginService,private router: Router ,private localStorage: CookieService, private toastrService : ToastrService   ) { 
        this.localStorage = localStorage;
    }

    ngOnInit() {}

    login() {
        console.log(this.toastrService);
        this.loginService.login(this.user).subscribe(res => {
            this.localStorage.set('token',res.token);
            this.localStorage.set('role',res.userRole)
            if(res.token !== null) {
                this.router.navigate(['/project']);
                this.toastrService.success('','Successfully Loggedin..')
            }else{
                this.router.navigate(['/login']);
            }
        }
            
        );
        
    }

    signup(){
        this.router.navigate(['/register']);
    }

}