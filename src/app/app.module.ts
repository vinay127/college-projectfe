import { CookieService } from 'ngx-cookie-service';
import { GeneralHeader } from './component/header/generalheader.component';
import { CustomerHeader } from './component/header/customerheader.component';
import { Header } from './component/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Headers } from '@angular/http';
import { ProjectComponent } from './component/project/project.component';

const routes: Routes = [

  // Home
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  { path: 'project', component: ProjectComponent }]

@NgModule({
  declarations: [
    AppComponent,
    Header,
    ProjectComponent,
    CustomerHeader,
    GeneralHeader
  ],
  imports: [
    BrowserModule,
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
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
