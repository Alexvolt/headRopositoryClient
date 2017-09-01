
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
  constructor(
    private router: Router,
    private http: Http,
  ) {}
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
