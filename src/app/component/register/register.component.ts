import { UserService } from './../../services/user.service';
import { User } from './../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { Routes , Router ,  RouterModule} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService]

})

export class RegisterComponent implements OnInit {

    user = new User;
    userRoles: String[] = ["User", "Seller"];

    constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }

    ngOnInit() {

    }

    register() {
        console.log(this.user);
        this.userService.createUser(this.user).subscribe(res => {
            this.user = res;
            this.router.navigate(['/product']);
            this.toastrService.success('', 'Successfully Loggedin')
        });


    }

    onChange(deviceValue) {

    }





}