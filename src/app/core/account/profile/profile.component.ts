import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { CredentialsService } from '../../authentication/credentials.service';
import { AppConfig } from '../../../app.config';
import { UserService } from "../../user.service";
import { AlertService } from "../../alerts/index";
import { User } from "../../user";

class PasswordDataForChange {
  oldPassword: string;
  password: string;
  confirmPassword: string;
  constructor(){ 
    this.oldPassword = ''
    this.password = ''
    this.confirmPassword = ''
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: User;
  loading = false;
  loadingP = false;
  is404 = false;
  isAdmin = false;
  readOnly = true;
  passwordData: PasswordDataForChange;
  isCurrentUserProfile = true;
  passwordMessage: string;
  private goBackAfterSaving = false;

  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private alertService: AlertService,
    private credentialsService: CredentialsService,
    private config: AppConfig,
  ) { 
    this.passwordData = new PasswordDataForChange();
  }
  
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
        user => {
          this.model = user;
          this.isCurrentUserProfile = (user.id == this.credentialsService.currentUserId());
        },
        error => {
          if(error.status == 404)
            this.is404 = true;
          else    
            this.alertService.error(error);
        }
      );
  }

  save(): void {
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

  comparePasswords(): boolean {
    if (this.passwordData.oldPassword 
      && this.passwordData.password 
      && this.passwordData.oldPassword == this.passwordData.password){

      this.passwordMessage = 'Старый и новый пароль не должны совпадать';
      return false;
    }
    else if (this.passwordData.confirmPassword 
      && this.passwordData.password 
      && this.passwordData.confirmPassword != this.passwordData.password) {
      
      this.passwordMessage = 'Пароль и подтверждение не совпадают';
      return false;
    }
    else {
      this.passwordMessage = null;
      return true;
    }
  }

  savePassword(): void {
    if(!this.comparePasswords()){
      this.alertService.error(this.passwordMessage);
      return;
    }
    let userId = this.model.id;
    let updateObs = this.isCurrentUserProfile 
    ? this.userService.updatePasswordCurrentUser(this.passwordData.oldPassword, this.passwordData.password) // currentUser password editing
    : this.userService.updatePassword(userId, this.passwordData.password) // need admin rights to update another user
  
    this.loadingP = true;
    updateObs.subscribe(
        () => {
          this.alertService.success('Данные успешно обновлены');
          this.loadingP = false;
        },
        error => {
          this.alertService.error(error); 
          this.loadingP = false;
        });
    
  }

}
