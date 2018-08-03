import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';

@Injectable()
export class LoginService {

    constructor(private httpService: HttpService) { }

    login(user: User) {
        return this.httpService.callApiObservable(`/login`, "POST", user, null)
    }

}