import { Injectable } from '@angular/core';

import { JwtHelper } from './jwt.helper';
import { AlertService } from "../alerts/alert.service";
//import moment from 'moment';


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
        this._userData.expDate = this.calcExpDate(); 
        this.save();}

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

    setAccessToken(tokenAccess: string) {
        this._userData.tokenAccess = tokenAccess;
        this._userData.expDate = this.calcExpDate();
        this.save();
    }

    private save(){
        localStorage.setItem('currentUser', JSON.stringify(this._userData)); 
    }

    private calcExpDate() {
        let userData = this.userData;
        try {
            let jwtHelper = new JwtHelper();
            let decodedToken = jwtHelper.decodeToken(userData.tokenAccess);    
            let dateDiffSeconds = decodedToken.exp - decodedToken.iat;
            let expDate = new Date(Date.parse(new Date().toString())+(dateDiffSeconds - 7)*1000);
            console.log(expDate);
            return expDate;
        } catch (error) {
            this.alertService.error(error);
        }
        return null;
    }
    
}