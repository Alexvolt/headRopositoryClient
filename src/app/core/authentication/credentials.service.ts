import { Injectable } from '@angular/core';

import {JwtHelper} from './jwt.helper';
import { AlertService } from "../alerts/alert.service";


@Injectable()
export class CredentialsService{

    private _userData: any;
    get userData(): any { 
        if(!this._userData)
            this._userData = JSON.parse(localStorage.getItem('currentUser'));
        return this._userData; 
    }
    set userData(userWithToken: any) {
        this._userData = userWithToken; 
        localStorage.setItem('currentUser', JSON.stringify(userWithToken)); }

    get currentUserId(): number {
        let userData = this.userData;
        if(userData)
            return userData.id;
        return -1;
    }
        
    constructor(private alertService: AlertService) { 
    }

    loggedIn(){
        if (this.userData) 
            return true;
        
        return false;
    }

    isAdmin() {
        let userData = this.userData;
        if(!userData)
            return false;

        let jwtHelper = new JwtHelper();
        try {
            let decodedToken = jwtHelper.decodeToken(userData.tokenAccess);    
            if(decodedToken.admin)
                return true;
        } catch (error) {
            this.alertService.error(error);
            this.remove();
        }
        
        return false;
    }

    currentUserName() {
        let userData = this.userData;
        if(userData)
            return userData.username;
        return '';
    }

    remove(){
        localStorage.removeItem('currentUser');    
        this._userData = undefined;    
    }
}