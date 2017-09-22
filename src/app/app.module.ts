import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './material/app.material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { HomeComponent } from './home/index';
import { NavItemsService } from './main-form/nav-items.service';
import { routing } from './app.routing';
import { HttpService } from "./core/http.service";
import { InputValidateHintComponent } from "./core/components/av-hint.component";
import { LoginComponent } from "./core/authentication/login/login.component";
import { RegisterComponent } from "./core/authentication/register/register.component";
import { AdminPanelComponent } from "./core/admin/admin-panel/admin-panel.component";
import { ProfileComponent } from "./core/account/profile/profile.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { AlertService } from "./core/alerts/alert.service";
import { AuthenticationService } from "./core/authentication/authentication.service";
import { CredentialsService } from "./core/authentication/credentials.service";
import { UserService } from "./core/user.service";
import { BasicDataService } from "./resume/shared/basic-data.service";
import { ProfessionalAreasService } from "./resume/shared/professional-areas.service";
import { ProfessionalAreasComponent } from './resume/shared/professional-areas/professional-areas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputValidateHintComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    ProfileComponent,
    ProfessionalAreasComponent
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
    BasicDataService,
    CredentialsService,
    HttpService,
    NavItemsService,
    ProfessionalAreasService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
