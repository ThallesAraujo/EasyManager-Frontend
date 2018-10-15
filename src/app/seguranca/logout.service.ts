import { Injectable } from '@angular/core';
import { ManagerHttp } from './manager-http';
import { OauthService } from './oauth.service';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private url = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: ManagerHttp,
    private auth: OauthService
  ) { }


  logout() {

    const headers = new Headers();

    const token = localStorage.getItem('token');

    headers.append('Authorization', `Bearer ${token}`);

    return this.http.delete(this.url, {headers, withCredentials: true})
    .toPromise()
    .then(() => {
      this.auth.limparToken();
    });

  }
}
