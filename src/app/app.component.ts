import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import 'rxjs/add/operator/delay';

import { NavItemsService } from './main-form/nav-items.service';
import { AuthenticationService } from "./core/authentication/authentication.service";
import { AlertService } from "./core/alerts/alert.service";


/**
 * MainApp with toolbar and sidenav.
 */
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NavItemsService]
})
export class AppComponent {
  navItemsMain = [
    {name: 'Главная', route: ''},
  ];
  navItemsAuth = [];
  isAdmin = false;
  loggedIn = false;
  currentUserName = '';

  constructor(
    private authService: AuthenticationService,
    private navItemsService: NavItemsService,
    private alertService: AlertService
  ) {
    this.updatePage();

    // delay need because of error in angular: it does not make any problems for app, but error is error
    this.authService.getMessage().delay(100).subscribe(
      message => this.updatePage(),
      error => { this.alertService.error(error); }
    );
  }

  updatePage() {
    let navSettings = this.navItemsService.getNavItems();
    this.navItemsAuth = navSettings.navItemsAuth; 
    this.loggedIn = navSettings.loggedIn; 
    this.isAdmin = navSettings.isAdmin; 
    this.currentUserName = navSettings.currentUserName; 
  }

}
