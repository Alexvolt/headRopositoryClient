import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './material/app.material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { 
  AdminPanelComponent,
  AlertService, 
  AuthGuard,
  AuthenticationService,
  UserService,
  ProfileComponent,
  CredentialsService,
  LoginComponent, 
  RegisterComponent 
} from './core/index';
import { HomeComponent } from './home/index';
import { NavItemsService } from './main-form/nav-items.service';
import { routing } from './app.routing';
import { HttpService } from "./core/http.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    AppMaterialModule,
    NgxDatatableModule,
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    CredentialsService,
    HttpService,
    NavItemsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
