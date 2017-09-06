import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, NavigationStart } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router,
    public snackBar: MdSnackBar) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          //this.subject.next();

          this.snackBar.dismiss();
        }
      } 
    });
  }

  clearAlert() {
    //console.log('clearAlert');
    this.snackBar.dismiss();
    
    // clear alert
    //this.subject.next();
  }

  success(message: string, keepAfterNavigationChange = false) {
    //console.log('success mess');
    this.snackBar.open(message, 'Закрыть', {
      duration: 15000,
    });

    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    //this.subject.next({ type: 'success', text: message });
  }

  error(message: any, keepAfterNavigationChange = false, ) {
    this.snackBar.open(this.getErrorMessageFromObject(message), 'Закрыть', {
      duration: 15000, extraClasses: ['error-message']
    });

    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    //this.subject.next({ type: 'error', text: message });
  }

  private getErrorMessageFromObject(message: any){
    if (typeof(message) == "string")
      return message;

    if(typeof(message) == "object"){
      if(message.status && message.status == 401){
        return "Для доступа к ресурсу требуется аутентификация";
      }

    if(message._body ){
        let messageBody = message._body;
        let bodyObject = undefined;
        try{
          bodyObject = JSON.parse(messageBody);
        }
        catch(err){};
        if (typeof(bodyObject) == "object")
          {
           if(bodyObject.isError){
             let mText = bodyObject.message;
             if(bodyObject.code)
               mText = mText + `, code: ${bodyObject.code}`;
             mText = mText + `, http code: ${message.status}`
             return mText;
           }
               
          }
        if(message.ok != undefined && !message.ok)
          return `http ошибка с кодом ${message.status}`;
      }
      }
    
    // for all other
    return message.toString();
  }

  getMessage(): Observable<any> {
    //console.log('getMessage');
    return this.subject.asObservable();
  }
}