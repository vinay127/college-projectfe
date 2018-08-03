import { Injectable } from '@angular/core';
import { Http , Response}   from '@angular/http';
import { Observable } from 	'rxjs/Observable' ;
import 'rxjs/Rx' ;
import {Headers, RequestOptions} from '@angular/http';
import { Output, EventEmitter }      from '@angular/core';
import { Subject } from 'rxjs/Subject';
export interface ErrorMessage {
	errorMessage: string;
	notificationInfo:string;
	errorCode : number;

}

@Injectable()
export class ErrorService{
	errorMessage : ErrorMessage;

	private subject: Subject<ErrorMessage> = new Subject<ErrorMessage>();

	setErrorMessage(errorMessage: ErrorMessage): void {
		this.errorMessage = errorMessage;
		this.subject.next(errorMessage);
	}
	getErrorMessage(): Observable<ErrorMessage> {
		return this.subject.asObservable();
	}

}