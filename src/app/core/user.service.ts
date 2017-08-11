import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { User } from '../core/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: string) {
        return this.http.get(environment.apiUrl + '/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(environment.apiUrl + '/users/register', user, this.jwt());
    }

    update(user: User) {
        return this.http.put(environment.apiUrl + '/users/' + user.id, user, this.jwt());
    }

    delete(id: string) {
        return this.http.delete(environment.apiUrl + '/users/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}