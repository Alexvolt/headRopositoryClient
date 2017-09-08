import { Injectable } from '@angular/core';

import { JwtHelper } from './jwt.helper';
import { AlertService } from "../alerts/alert.service";


@Injectable()
export class CredentialsService{

    private _userData: any;
    private _decodedTokenAccess: any;
    get userData(): any { 
        if(!this._userData)
            this._userData = JSON.parse(localStorage.getItem('currentUser'));
        return this._userData; 
    }
    set userData(userWithToken: any) {
        this._userData = userWithToken;
        this.onTokenAccessChange()
        this.save();
    }

    constructor(private alertService: AlertService) { 
    }

    loggedIn(){
        if (this.userData) 
            return true;
        
        return false;
    }

    isAdmin() {
        let decodedToken = this.decodedTokenAccess();
        if(decodedToken && decodedToken.admin)
            return true;
        return false;
    }

    currentUserId(): number {
        let decodedToken = this.decodedTokenAccess();
        if(decodedToken && decodedToken.sub)
            return decodedToken.sub;
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

    setAccessToken(tokenAccess: string) {
        this._userData.tokenAccess = tokenAccess;
        this.onTokenAccessChange();
        this.save();
    }
    
    private decodedTokenAccess(): any { 
        if(!this._decodedTokenAccess){
        }

        let userData = this.userData;
        if(userData){
        let jwtHelper = new JwtHelper();
        try {
            this._decodedTokenAccess = jwtHelper.decodeToken(userData.tokenAccess);    
        } catch (error) {
            this.alertService.error(error);
            this.remove();
        }
        }
        return this._decodedTokenAccess; 
    }

    private onTokenAccessChange() {
        this._userData.expDateTime = this.calcExpDateTime();
        this._decodedTokenAccess = null;
    }
    
    private save(){
        localStorage.setItem('currentUser', JSON.stringify(this._userData)); 
    }

    private calcExpDateTime() {
        let userData = this.userData;
        try {
            let jwtHelper = new JwtHelper();
            let decodedToken = jwtHelper.decodeToken(userData.tokenAccess);    
            let dateDiffSeconds = decodedToken.exp - decodedToken.iat;
            let expDateTime = new Date(Date.parse(new Date().toString())+(dateDiffSeconds - 7)*1000);
            return expDateTime;
        } catch (error) {
            this.alertService.error(error);
        }
        return null;
    }
    
}