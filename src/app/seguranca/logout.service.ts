import { Injectable } from '@angular/core';
import { OauthService } from './oauth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private url: string;

  constructor(
    private client: HttpClient,
    private auth: OauthService
  ) {
    this.url = `${environment.apiUrl}/tokens/revoke`;
  }


  logout() {

    return this.client.delete(this.url, {withCredentials: true})
    .toPromise()
    .then(() => {
      this.auth.limparToken();
    });

  }
}
