import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { AlertService, UserService, User } from '../../index';
import { CredentialsService } from '../../authentication/credentials.service';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: User;
  loading = false;
  is404 = false;
  isAdmin = false;
  readOnly = true;
  private goBackAfterSaving = false;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private alertService: AlertService,
    private credentialsService: CredentialsService,
    private config: AppConfig) { }
  
  ngOnInit() {
    this.isAdmin = this.credentialsService.isAdmin();
    if (this.isAdmin)
        this.readOnly = false;

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let paramVal = params.get('id');

        if (paramVal == null) {
          this.readOnly = false; 
          return this.userService.current();
        }
        else {   
          this.goBackAfterSaving = true;
          return this.userService.getById(+paramVal);
        }
      })
      .subscribe(
        user => this.model = user,
        error => {
          if(error.status == 404)
            this.is404 = true;
          else    
            this.alertService.error(error);
        }
      );
  }

  save(){
    this.userService.update(this.model).subscribe(
        () => {
            if (this.goBackAfterSaving) 
                this.goBack();
            else
                this.alertService.success('Данные успешно обновлены')
        },
        error => this.alertService.error(error));  
  }

  goBack(){
    this.location.back();
  }

}
