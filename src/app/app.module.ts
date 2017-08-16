import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {AppMaterialModule} from './app.material.module';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AuthGuard } from './core/index';
import { AlertComponent } from './core/index';
import { AlertService, UserService } from './core/index';
import { AuthenticationService } from './authentication/index';
import { LoginComponent,RegisterComponent } from './authentication/index';
import { HomeComponent } from './home/index';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    AppMaterialModule
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
