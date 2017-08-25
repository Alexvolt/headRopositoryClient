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
  AuthGuard,
//  AlertComponent,
  AlertService, 
  UserService
  } from './core/index';
import { 
  AuthenticationService, 
  LoginComponent, 
  RegisterComponent } from './authentication/index';
import { HomeComponent } from './home/index';
import { NavItemsService } from './main-form/nav-items.service';
import { routing } from './app.routing';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ProfileComponent } from './account/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
//    AlertComponent,
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
    NavItemsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
