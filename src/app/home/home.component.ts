import { Component, OnInit } from '@angular/core';

import { User } from '../core/index';
import { AlertService, UserService } from '../core/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: string) {
        this.userService.delete(id).subscribe(
            () => { this.loadAllUsers(); },
            error => {this.alertService.error(error);});
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; },
            error => {this.alertService.error(error);});
    }
}