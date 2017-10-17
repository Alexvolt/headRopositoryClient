import { Injectable } from '@angular/core';

import { JwtHelper } from './jwt.helper';
import { AlertService } from "../alerts/alert.service";

 

@Injectable()
export class CredentialsService{
    test = new Date();

    private readonly roleAttrName = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    private _userData: any;
    private _decodedaccessToken: any;
    private _accessTokenExpDateTime: Date;
    get userData(): any { 
        if(!this._userData)
            this._userData = JSON.parse(localStorage.getItem('currentUser'));
        return this._userData; 
    }
    set userData(userWithToken: any) {
        this._userData = userWithToken;
        this.onaccessTokenChange()
        this.save();
    }

    get accessTokenExpDateTime(){
        return this._accessTokenExpDateTime;
    }

    constructor(private alertService: AlertService) {
        this._accessTokenExpDateTime = new Date();
    }

    loggedIn(){
        if (this.userData) 
            return true;
        
        return false;
    }

    isAdmin() {
        let decodedToken = this.decodedaccessToken();
        if(decodedToken && decodedToken[this.roleAttrName] == 'Admin')
            return true;
        return false;
    }

    currentUserId(): number {
        let decodedToken = this.decodedaccessToken();
        if(decodedToken && decodedToken.sub)
            return +decodedToken.sub;
        return null;
    }

    currentUserName() {
        let userData = this.userData;
        if(userData)
            return userData.user.username;
        return '';
    }

    remove(){
        localStorage.removeItem('currentUser');    
        this._userData = undefined;    
    }

    setaccessToken(accessToken: string) {
        this._userData.accessToken = accessToken;
        this.onaccessTokenChange();
        this.save();
    }
    
    private decodedaccessToken(): any { 
        if(!this._decodedaccessToken){
        }

        let userData = this.userData;
        if(userData){
        let jwtHelper = new JwtHelper();
        try {
            this._decodedaccessToken = jwtHelper.decodeToken(userData.accessToken);
        } catch (error) {
            this.alertService.error(error);
            this.remove();
        }
        }
        return this._decodedaccessToken; 
    }

    private onaccessTokenChange() {
        this._accessTokenExpDateTime = this.calcExpDateTime();
        this._decodedaccessToken = null;
    }
    
    private save(){
        localStorage.setItem('currentUser', JSON.stringify(this._userData)); 
    }

    private calcExpDateTime() {
        let userData = this.userData;
        try {
            let jwtHelper = new JwtHelper();
            let decodedToken = jwtHelper.decodeToken(userData.accessToken);   
            let expDate = decodedToken.nbf ? decodedToken.nbf : decodedToken.iat;   
            let dateDiffSeconds = decodedToken.exp - expDate;
            console.log(`token exp in ${dateDiffSeconds} seconds`);
            let expDateTime = new Date(Date.parse(new Date().toString())+(dateDiffSeconds - 5)*1000);
            return expDateTime;
        } catch (error) {
            this.alertService.error(error);
        }
        return null;
    }
    
}