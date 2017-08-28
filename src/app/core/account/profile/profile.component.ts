import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AlertService, UserService, User } from '../../index';
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

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private config: AppConfig) { }
  
    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                let paramVal = params.get('id');
                if (paramVal == null)
                    return this.userService.current();
                else    
                    return this.userService.getById(+paramVal);
            })
            .subscribe(
                user => this.model = user,
                error => 
                {
                    if(error.status = 404)
                        this.is404 = true;
                    else    
                        this.alertService.error(error);
                }
            );
    }

}
