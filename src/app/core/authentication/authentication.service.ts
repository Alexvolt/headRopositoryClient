import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { environment } from '../../../environments/environment';
import { CredentialsService } from './credentials.service';
import { HttpService } from "../http.service";

@Injectable()
export class AuthenticationService {
    private subject = new Subject<any>();

    constructor(
        private http: HttpService,
        private credentialsService: CredentialsService
    ) { }

    login(username: string, password: string) {
        let requestOptions = {body: { username: username, password: password }};
        return this.http.post(environment.apiUrl + '/users/authenticate', requestOptions)
            .map((user) => {
                // login successful if there's a jwt token in the response
                if (user && user.refreshToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.credentialsService.userData = user;
                    this.subject.next({ loggedIn: true });
                } 
            });
    }

    logout() {
        // remove user from local storage to log user out
        this.credentialsService.remove();        
        this.subject.next({ loggedIn: false });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}