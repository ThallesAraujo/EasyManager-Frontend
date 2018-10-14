import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauth: OauthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.oauth.tokenExpirado()) {
      return this.oauth.obterNovoAccessToken()
        .then(() => {
          if (this.oauth.tokenExpirado()) {
            this.router.navigate(['/login']);
            return false;
          }

          return true;
        });
    }

    if (next.data.roles && !this.oauth.temPermissaoRequerida(next.data.roles)) {
      this.router.navigate(['/403']);
      return false;
    }
    return true;
  }
}
