import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {CredentialsService} from '../authentication/credentials.service'

@Injectable()
export class AuthGuard implements CanActivate {

    // ссылки начинающиеся с /admin /profile/ 
    private readonly reAdminUrls = new RegExp("^\/admin|^\/profile\/");

    constructor(
        private router: Router,
        private credentialsService: CredentialsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.credentialsService.isAdmin() && this.reAdminUrls.test(state.url))
            return false;
        if (this.credentialsService.loggedIn())
            return true;

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}