import { Injectable } from '@angular/core';

import {JwtHelper} from './jwt.helper';


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

    constructor() { 
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
        let decodedToken = jwtHelper.decodeToken(userData.token);
        if(decodedToken.admin)
            return true;
        return false;
    }

    remove(){
        localStorage.removeItem('currentUser');    
        this._userData = undefined;    
    }
}