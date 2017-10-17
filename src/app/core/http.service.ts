
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CredentialsService } from './authentication/credentials.service'
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {

  activeRequestCount: number = 0;

  constructor(
    private router: Router,
    private http: Http,
    private credentialsService: CredentialsService
  ) { }

  httpRequest(url: string, options: RequestOptionsArgs): Observable<any> {
    this.activeRequestCount++;
    return this.basicHttpRequest(url, options, false).finally(() => { this.activeRequestCount--; });
  }

  get(url: string, options?: RequestOptionsArgs, isRetry?: boolean): Observable<any> {
    options = this.getOptions(RequestMethod.Get, options);
    return this.httpRequest(url, options);
  }

  post(url: string, options?: RequestOptionsArgs, isRetry?: boolean): Observable<any> {
    options = this.getOptions(RequestMethod.Post, options);
    return this.httpRequest(url, options);
  }

  put(url: string, options?: RequestOptionsArgs, isRetry?: boolean): Observable<any> {
    options = this.getOptions(RequestMethod.Put, options);
    return this.httpRequest(url, options);
  }

  delete(url: string, options?: RequestOptionsArgs, isRetry?: boolean): Observable<any> {
    options = this.getOptions(RequestMethod.Delete, options);
    return this.httpRequest(url, options);
  }

  private basicHttpRequest(url: string, options: RequestOptionsArgs, isRetry?: boolean): Observable<any> {
    if (!isRetry && this.credentialsService.loggedIn()){ 
      let curTime = new Date(), tokenExpDateTime = this.credentialsService.accessTokenExpDateTime;
      //console.log(`curTime = ${curTime}, tokenExpDateTime = ${tokenExpDateTime}, this.credentialsService.userData.expDateTime = ${this.credentialsService.userData.expDateTime}`);
      if(curTime >= tokenExpDateTime ){ 
        //console.log('Need to recive new token, current exp date ');
        return this.recieveNewTokenAndMakeOriginalRequest(url, options);
      }
    }

    // try to make request. If err-status == 401, try recieve a new token; if yes - repeat a request
    let myHeaders = this.getHeaders();
    if (myHeaders)
        options.headers = myHeaders;
    return this.http.request(url, options)
      .map(response => {
        // ok response - return data in json
        return this.extractData(response);
      })
      .catch(error => {
        if (!isRetry && error.status == 401) {
          // try recieve a new token; if yes - repeat a request
          return this.recieveNewTokenAndMakeOriginalRequest(url, options);
        } else
          return Observable.throw(error);
      });
  }

  private recieveNewTokenAndMakeOriginalRequest(url: string, options: RequestOptionsArgs) {
    return this.accessTokenRequest()
      .switchMap((response: Response) => {
        // update token
        let accessToken = response.json().accessToken
        //console.log(`update token`);//console.log(`update token: ${accessToken}`);
        this.credentialsService.setaccessToken(accessToken);
        // repeat an original request
        return this.basicHttpRequest(url, options, true);
      })
      .catch(error => {
        if (error.status == 401) {
          // cant to recive new accessToken. Need to logout - and then need to login again
          this.router.navigate(['/login']);
        }
        return Observable.throw(error);
      })
  }

  private accessTokenRequest(): Observable<Response> {
    return this.http.post(environment.apiUrl + '/users/accessToken', { refreshToken: this.credentialsService.userData.refreshToken });
  }

  private getOptions(method: RequestMethod, options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = { method: method };
    }
    if (options.method != method)
      options.method = method;
    return options;
  }

  private getHeaders() {
    let currentUser = this.credentialsService.userData;
    if (currentUser && currentUser.accessToken) {
      return new Headers({ 'Authorization': 'Bearer ' + currentUser.accessToken });
    }
    return null;
  }

  private extractData(res: Response) {
    let body;
    if (res.text())
      try {
        return res.json();
      }
      catch (err) { };

    return body;
  }

}
