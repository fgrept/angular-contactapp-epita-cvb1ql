import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactlistComponent } from './contact-container/contactlist/contactlist.component';
import { ContactsidebarComponent } from './contact-container/contactsidebar/contactsidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersoUppercasePipe } from './shared/perso-uppercase.pipe';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { ApiComponent } from './api/api.component';
import { TokenInterceptor } from './services/token.interceptor';
// importer des components UI 
import { MaterialModule } from './shared/material/material.module';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './services/loader.interceptor';
import { ContactContainerComponent } from './contact-container/contact-container.component';
import { LoginComponent } from './login/login.component';
import { ContactDetailComponent } from './contact-container/contact-detail/contact-detail.component';
import { ContactFormComponent } from './contact-container/contact-form/contact-form.component';


@NgModule({
  imports:[ 
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    AppComponent, 
    ContactlistComponent, 
    ContactsidebarComponent, 
    PersoUppercasePipe, 
    ApiComponent, 
    ContactContainerComponent, 
    LoginComponent, 
    ContactDetailComponent, 
    ContactFormComponent ],

  bootstrap:    [ AppComponent ],
  providers: [
    UserService, AuthService, LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}
  ]
})
export class AppModule { }
