import { Injectable } from '@angular/core';
//import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../core/index';
import { CredentialsService } from './authentication/credentials.service'
import { HttpService } from "./http.service";


@Injectable()
export class UserService{
    constructor(
        private http: HttpService,
        private credentialsService: CredentialsService) { 
    }

    getAll(
        params?: string | URLSearchParams | {
            [key: string]: any | any[];
            } | null) {
        return this.http.get(environment.apiUrl + '/users', params ? {params: params} : undefined );
         
    }

    getById(id: number) {
        return this.http.get(environment.apiUrl + '/users/' + id);
    }

    current() {
        return this.http.get(environment.apiUrl + '/users/current');
    }

    create(user: User) {
        return this.http.post(environment.apiUrl + '/users/register', { body: user });
    }

    update(user: User) {
        return this.http.put(environment.apiUrl + '/users/' + user.id, { body: user });
    }

    delete(id: number) {
        return this.http.delete(environment.apiUrl + '/users/' + id);
    }
}