import { CoolStorageModule } from 'angular2-cool-storage';
import { ErrorComponent } from './component/error/error.component';
import { LoginComponent } from './component/login/login.component';
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { GeneralHeader } from './component/header/generalheader.component';
import { CustomerHeader } from './component/header/customerheader.component';
import { Header } from './component/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Headers } from '@angular/http';
import { ProjectComponent } from './component/project/project.component';
import { ErrorService } from './services/error.service';

const routes: Routes = [

  // Home
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'project', component: ProjectComponent }]

@NgModule({
  declarations: [
    AppComponent,
    Header,
    ProjectComponent,
    CustomerHeader,
    GeneralHeader,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CoolStorageModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService, LoginService, HttpService, ErrorService,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
