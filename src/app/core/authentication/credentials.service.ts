import { Injectable } from '@angular/core';

import { JwtHelper } from './jwt.helper';
import { AlertService } from "../alerts/alert.service";

 

@Injectable()
export class CredentialsService{
    test = new Date();

    private readonly roleAttrName = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    private _userData: any;
    private _decodedAccessToken: any;
    private _AccessTokenExpDateTime: Date;
    get userData(): any { 
        if(!this._userData)
            this._userData = JSON.parse(localStorage.getItem('currentUser'));
        return this._userData; 
    }
    set userData(userWithToken: any) {
        this._userData = userWithToken;
        this.onAccessTokenChange()
        this.save();
    }

    get AccessTokenExpDateTime(){
        return this._AccessTokenExpDateTime;
    }

    constructor(private alertService: AlertService) {
        this._AccessTokenExpDateTime = new Date();
    }

    loggedIn(){
        if (this.userData) 
            return true;
        
        return false;
    }

    isAdmin() {
        let decodedToken = this.decodedAccessToken();
        if(decodedToken && decodedToken[this.roleAttrName] == 'Admin')
            return true;
        return false;
    }

    currentUserId(): number {
        let decodedToken = this.decodedAccessToken();
        if(decodedToken && decodedToken.sub)
            return +decodedToken.sub;
        return null;
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

    setAccessToken(AccessToken: string) {
        this._userData.AccessToken = AccessToken;
        this.onAccessTokenChange();
        this.save();
    }
    
    private decodedAccessToken(): any { 
        if(!this._decodedAccessToken){
        }

        let userData = this.userData;
        if(userData){
        let jwtHelper = new JwtHelper();
        try {
            this._decodedAccessToken = jwtHelper.decodeToken(userData.AccessToken);
        } catch (error) {
            this.alertService.error(error);
            this.remove();
        }
        }
        return this._decodedAccessToken; 
    }

    private onAccessTokenChange() {
        this._AccessTokenExpDateTime = this.calcExpDateTime();
        this._decodedAccessToken = null;
    }
    
    private save(){
        localStorage.setItem('currentUser', JSON.stringify(this._userData)); 
    }

    private calcExpDateTime() {
        let userData = this.userData;
        try {
            let jwtHelper = new JwtHelper();
            let decodedToken = jwtHelper.decodeToken(userData.AccessToken);   
            let expDate = decodedToken.nbf ? decodedToken.nbf : decodedToken.iat;   
            let dateDiffSeconds = decodedToken.exp - decodedToken.iat;
            let expDateTime = new Date(Date.parse(new Date().toString())+(dateDiffSeconds - 5)*1000);
            return expDateTime;
        } catch (error) {
            this.alertService.error(error);
        }
        return null;
    }
    
}