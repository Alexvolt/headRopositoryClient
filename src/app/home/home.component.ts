import { Component, OnInit } from '@angular/core';

import { User } from '../core/index';
import { AlertService, UserService } from '../core/index';
import { CredentialsService } from '../core/authentication/credentials.service'

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private credentialsService: CredentialsService
    ) {
        this.currentUser = credentialsService.userData;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(
            () => { this.loadAllUsers(); },
            error => {this.alertService.error(error);});
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; },
            error => {this.alertService.error(error);});
    }
}