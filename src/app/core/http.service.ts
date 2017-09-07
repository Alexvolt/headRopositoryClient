
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
    if (!isRetry){ 
      let curTime = new Date(), tokenExpDateTime = this.credentialsService.userData.expDateTime;
      if(tokenExpDateTime && tokenExpDateTime > curTime){ 
        console.log('Need to recive new token, current exp date ');
        return this.recieveNewTokenAndMakeOriginalRequest(url, options);
      }
    }

    // try to make request. If err-status == 401, try recieve a new token; if yes - repeat a request
    options.headers = this.getHeaders();
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
        let tokenAccess = response.json().tokenAccess
        console.log(`update token`);//console.log(`update token: ${tokenAccess}`);
        this.credentialsService.setAccessToken(tokenAccess);
        // repeat an original request
        return this.basicHttpRequest(url, options, true);
      })
      .catch(error => {
        if (error.status == 401) {
          // cant to recive new AccessToken. Need to logout - and then need to login again
          this.router.navigate(['/login']);
        }
        return Observable.throw(error);
      })
  }

  private accessTokenRequest(): Observable<Response> {
    return this.http.post(environment.apiUrl + '/users/accessToken', { tokenAuth: this.credentialsService.userData.tokenAuth });
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
    if (currentUser && currentUser.tokenAccess) {
      return new Headers({ 'Authorization': 'Bearer ' + currentUser.tokenAccess });
    }
    return null;
  }

  private extractData(res: Response) {
    let body;
    if (res.text())
      try {
        body = res.json();;
      }
      catch (err) { };

    return body || {};//empty object if put or delete
  }

}
/*

  constructor(
    private router: Router,
    private http: Http,
    private sharedData: SharedDataService,
    private authGuard: AuthGuard,
    private loaderService: LoaderService,
  ) {}

  get(url: string, params?: object): Observable<any> {
    const sendGetRequest = () => {
      let queryParams: string = '';
      if (params) queryParams = '?' + this.prepareParamsString(params);

      return this.http.get(url + queryParams, this.sharedData.options)
        .map(response => this.extractData(response))
        .catch(error => {
          if (error.status == 401) {
            this.authGuard.tryGetNewToken();
            return this.authGuard.gotAuthData.first().switchMap(
              () => {
                this.setOptions();
                return this.http.get(url + queryParams, this.sharedData.options)
                  .map(response => this.extractData(response))
                  .catch(error => {
                    this.logout();
                    return this.handleError(error);
                  })
              }
            )
          }
          else return this.handleError(error);
        });
    };

    return Observable.create((observer) => {
      this.loaderService.activeRequestCount.next(1);
      if (this.sharedData.authData && this.sharedData.authData.expirationDate > moment()) {
        sendGetRequest().subscribe(
          data => {
            this.loaderService.activeRequestCount.next(-1);
            observer.next(data);
          },
          error => {
            this.loaderService.activeRequestCount.error(-1);
            observer.error(error);
          }
        );
      }
      else {
        this.authGuard.tryGetNewToken();
        this.authGuard.gotAuthData.first().subscribe(() => {
          this.setOptions();
          sendGetRequest().subscribe(
            data => {
              this.loaderService.activeRequestCount.next(-1);
              observer.next(data);
            },
            error => {
              this.loaderService.activeRequestCount.error(-1);
              observer.error(error);
            }
          );
        });
      }
    });
  }

  post(url: string, data?: object): Observable<any> {
    const sendPostRequest = () => {
      return this.http.post(url, data, this.sharedData.options)
        .map(response => this.extractData(response))
        .catch(error => {
          if (error.status == 401) {
            this.authGuard.tryGetNewToken();
            return this.authGuard.gotAuthData. ().switchMap(
              () => {
                this.setOptions();
                return this.http.post(url, data, this.sharedData.options)
                  .map(response => this.extractData(response))
                  .catch(error => {
                    this.logout();
                    return this.handleError(error);
                  })
              }
            )
          }
          else return this.handleError(error);
        });
    }

    return Observable.create((observer) => {
      this.loaderService.activeRequestCount.next(1);
      if (this.sharedData.authData && this.sharedData.authData.expirationDate > moment()) {
        sendPostRequest().subscribe(
          data => {
            this.loaderService.activeRequestCount.next(-1);
            observer.next(data);
          },
          error => {
            this.loaderService.activeRequestCount.error(-1);
            observer.error(error);
          }
        );
      }
      else {
        this.authGuard.tryGetNewToken();
        this.authGuard.gotAuthData.first().subscribe(() => {
          this.setOptions();
          sendPostRequest().subscribe(
            data => {
              this.loaderService.activeRequestCount.next(-1);
              observer.next(data);
            },
            error => {
              this.loaderService.activeRequestCount.error(-1);
              observer.error(error);
            }
          );
        });
      }
    });
  }

  private prepareParamsString(params: object): string {
    let paramsArray: string[] = [];
    for (let key in params) paramsArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    return paramsArray.join('&');
  }

  private setOptions() {
    this.sharedData.headers.set('Authorization', `${this.sharedData.authData.token_type} ${this.sharedData.authData.access_token}`);
    this.sharedData.options = new RequestOptions({ headers: this.sharedData.headers });
  }

  extractData(res: Response) {
    let body;
    if (res.text()) body = res.json();
    return body || {};
  }

  handleError(error: Response | any): Observable<any> {
    switch (error.status) {
      case 400:
        let err;
        if (error.text()) err = error.json();
        return Observable.throw(err);
      case 401:
        return Observable.throw('Error 401 (Unauthorized)');
      case 403:
        let body;
        if (error.text()) body = error.json();
        return Observable.throw(body || {});
      case 521:
        this.router.navigate(['maintenance']);
        return Observable.throw('Error 521 (Maintenance)');
      default:
        let errMsg: string;
        if (error instanceof Response) {
          if (error.text()) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          }
          else errMsg = 'Response has no body';
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
  }

  private logout() {
    localStorage.clear();
    window.location.href = SITE_URL + 'account/login';
  }
}
*/
