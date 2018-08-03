import { ErrorMessage } from './../../services/error.service';
import { Component , OnInit,NgZone } from '@angular/core';
import { Routes , Router ,  RouterModule} from '@angular/router';
import { CoolLocalStorage } from 'angular2-cool-storage';
import  { ErrorService } from '../../services/error.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'error',
  templateUrl:'./error.component.html',
  styleUrls:['./error.component.css']
})
export class ErrorComponent implements OnInit {

  isValue : boolean;  
  errorMessage :  ErrorMessage;

  constructor(public errorService : ErrorService, private toastrService : ToastrService)
  { 

  }

  ngOnInit() {
    
    this.errorService.getErrorMessage().subscribe(error =>  
     this.showToastrMessage(error)
    );
  }

  showToastrMessage(errorMessage : ErrorMessage){

    this.toastrService.clear();
    if(errorMessage.notificationInfo === 'INFO'){
      this.toastrService.info('', errorMessage.errorMessage);
    }else if(errorMessage.notificationInfo === 'ERROR'){
      this.toastrService.error('', errorMessage.errorMessage);
    }
  }
}
