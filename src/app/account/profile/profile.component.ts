import { Component, OnInit } from '@angular/core';

import { AlertService, UserService } from '../../core';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private config: AppConfig) { }
  
    ngOnInit() {
      this.userService.getById
    }

    register() {
        this.alertService.clearAlert();
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Данные сохранены', true);
                },
                error => {
                    console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
