import { CookieService } from 'ngx-cookie-service';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Headers } from '@angular/http';
import { ErrorMessage } from './error.service';
import { ErrorService } from './error.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {


	private globalUrl = "http://localhost:8085";



	localStorage: CookieService;
	token: string;


	constructor(private http: Http, private errorService: ErrorService, localStorage: CookieService) {
		this.localStorage = localStorage;
	}

	private getHeaders() {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		return headers;
	}

	callApiObservable(relativeUrl: string, methodType: string, methodData: any, headers: Headers, isJsonNotRequred?: boolean) {
		let url = this.globalUrl + relativeUrl;

		if (headers == null) {
			headers = this.getHeaders();
		}
		headers.append('token', this.localStorage.get('token'));

		if (methodType === "GET") {
			if (isJsonNotRequred) {
				return this.http.get(url, { headers: headers }).catch(err => this.handleError(err));
			}
			return this.http.get(url, { headers: headers }).map(res => res.json()).catch(err => this.handleError(err));


		} else if (methodType === "POST") {
			console.log(url);
			if (isJsonNotRequred) {

				console.log("If part")
				return this.http.post(url, methodData, {
					headers: headers
				}).catch(err => this.handleError(err));
			} else {
				console.log("Else part")
				console.log("Method Data :::::" + JSON.stringify(methodData));
				return this.http.post(url, methodData, {
					headers: headers
				}).map(res => res.json()).catch(err => this.handleError(err));

			}

		} else if (methodType === "PUT") {
			return this.http.put(url, methodData, {
				headers: headers
			}).map(res => res.json()).catch(err => this.handleError(err));

		} else {
			return this.http.delete(url, {
				headers: headers
			}).map(res => res.json()).catch(err => this.handleError(err));
		}
	}


	callApiPromise(relativeUrl: string, methodType: string, methodData: any, headers: Headers) {
		let url = this.globalUrl + relativeUrl;

		if (methodType === "GET") {

			return this.http.get(url, { headers: headers }).toPromise().then(res => res.json()).catch(err => this.handleError(err));

		} else if (methodType === "POST") {

			return this.http.post(url, methodData, {
				headers: headers
			}).toPromise().then(res => res.json()).catch(err => this.handleError(err));

		} else if (methodType === "PUT") {

			return this.http.put(url, methodData, {
				headers: headers
			}).toPromise().then(res => res.json()).catch(err => this.handleError(err));

		} else {
			return this.http.delete(url, { headers: headers }).toPromise().then(res => res.json()).catch(err => this.handleError(err));

		}
	}




	handleError(error: Response | any) {


		var isValidError = true;
		try {

			error.json();
		} catch (e) {
			isValidError = false;
		}

		if (isValidError) {
			this.errorService.setErrorMessage(error.json() as ErrorMessage);

			// In a real world app, you might use a remote logging infrastructure
			let errMsg: string;
			if (error instanceof Response) {
				const body = error.json() || '';
				const err = body.error || JSON.stringify(body);
				errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
			} else {
				errMsg = error.message ? error.message : error.toString();
			}

			return Observable.throw(errMsg);
		}

	}


	callAPIObservableFormData(relativeUrl: string, fileInput: any, headers: Headers, isJsonNotRequred?: boolean): Observable<any> {
		return Observable.create(observer => {
			let url = this.globalUrl + relativeUrl;
			const fileBrowser = fileInput.nativeElement;
			console.log("filebrowser is  : " + fileBrowser)


			const formData = new FormData();
			formData.append('file', fileInput);
			const xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.onload = function () {
				if (this['status'] === 200) {
					const responseText = this['responseText'];
					const files = JSON.parse(responseText);
					//todo: emit event
				} else {
				}
			};
			xhr.send(formData);
			/*	if (fileBrowser.files && fileBrowser.files[0]) {
					const formData = new FormData();
					formData.append('file', fileInput);
					const xhr = new XMLHttpRequest();
					xhr.open('POST', url, true);
					xhr.onload = function () {
						if (this['status'] === 200) {
							const responseText = this['responseText'];
							const files = JSON.parse(responseText);
							//todo: emit event
						} else {
						}
					};
					xhr.send(formData);
				}*/

		}).map(res => this.handleSuccessSituation(res)).catch(err => this.handleError(err));;
	}


	handleSuccessSituation(error: Response) {
		if (error.status == 250) {
			this.handleError(error);
			return error.json();
		}
		return error.json();

	}

}