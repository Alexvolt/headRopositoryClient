import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    private subject = new Subject<any>();

    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(environment.apiUrl + '/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.subject.next({ loggedIn: true });
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.subject.next({ loggedIn: false });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
}