import { Injectable } from '@angular/core';

import { jsonwebtoken } from 'jsonwebtoken';

//import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService{

    private _token: any;
    get token(): any { return localStorage.getItem('currentUser'); }
    set token(userWithToken: any) { localStorage.setItem('currentUser', JSON.stringify(userWithToken)); }

    constructor() { 
    }

    loggedIn(){
        if (this.token) 
            return true;
        
        return false;
    }

    isAdmin() {
        this.token.
    }
}