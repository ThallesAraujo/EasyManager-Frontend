import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { OauthService } from './oauth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ManagerHttp {

  constructor(protected http: Http, protected oauth: OauthService) {}

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.get(url, options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.post(url, body, options));
  }
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.put(url, body, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.delete(url, options));
  }
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.patch(url, body, options));
  }
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.head(url, options));
  }
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.executeStatement(() => this.http.options(url, options));
  }

  private executeStatement(fn: Function): Observable<any> {

    if (this.oauth.tokenExpirado()) {
      console.log('Obtendo novo access token..');

      this.oauth.obterNovoAccessToken();
    }
      return fn();

    }
  }
}
