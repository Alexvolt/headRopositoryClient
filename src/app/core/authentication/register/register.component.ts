﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfig } from '../../../app.config';
import { UserService } from "../../user.service";
import { AlertService } from "../../alerts/alert.service";

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private config: AppConfig) { }

    register() {
        this.alertService.clearAlert();
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Вы успешно зарегистрированы', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
