import { Injectable } from '@angular/core';
import { OauthService } from './oauth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class ExpiredSessionError{}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private oauth: OauthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.oauth.tokenExpirado()) {
      this.oauth.obterNovoAccessToken();
      if (this.oauth.tokenExpirado()) {
        throw new ExpiredSessionError();
      }
    }
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return next.handle(request);

  }

}
