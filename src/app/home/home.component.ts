import { Component, OnInit } from '@angular/core';

import { User } from '../core/index';
import { AlertService, UserService } from '../core/index';
import { CredentialsService } from '../core/authentication/credentials.service'

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    selectedValue: string[];
    foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    stateCtrl: FormControl;
    filteredStates: Observable<any[]>;
    states: any[] = [
        {
            name: 'Arkansas',
            population: '2.978M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
        },
        {
            name: 'California',
            population: '39.14M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
        },
        {
            name: 'Florida',
            population: '20.27M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
        },
        {
            name: 'Texas',
            population: '27.47M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
        }
    ];


    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private credentialsService: CredentialsService
    ) {
        this.currentUser = credentialsService.userData;

        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(state => state ? this.filterStates(state) : this.states.slice());
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    filterStates(name: string) {
        return this.states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }


    deleteUser(id: number) {
        this.userService.delete(id).subscribe(
            () => { this.loadAllUsers(); },
            error => { this.alertService.error(error); });
    }

    typeofSelected() {
        return typeof this.selectedValue;
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; },
            error => { this.alertService.error(error); });
    }
}