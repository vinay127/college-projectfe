import { User } from './../model/user.model';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor(private httpService : HttpService) {}

    getCustomer() {
         return this.httpService.callApiObservable(`/customers`,"GET",null,null)
    }

    createUser(user : User){
        return this.httpService.callApiObservable('/customers',"POST",user, null);
    }
    updateUser(user : User){
        return this.httpService.callApiObservable('/customers',"PUT",user, null);
    }


}