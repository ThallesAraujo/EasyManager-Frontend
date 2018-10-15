import { Injectable } from '@angular/core';
import { OauthService } from './oauth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private url = 'http://localhost:8080/tokens/revoke';

  constructor(
    private client: HttpClient,
    private auth: OauthService
  ) { }


  logout() {

    return this.client.delete(this.url, {withCredentials: true})
    .toPromise()
    .then(() => {
      this.auth.limparToken();
    });

  }
}
