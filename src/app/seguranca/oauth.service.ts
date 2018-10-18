import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelperService as JwtHelper } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  payload: any;

  oauthUrl: string;

  constructor(
    private http: Http,
    private helper: JwtHelper
  ) {
    this.oauthUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `&client=angular&username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.salvarToken(response.json().access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();


          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('E-mail e/ou senha inválidos!');
          }
          return Promise.reject(response);
        }
      });

  }

  private salvarToken(token: string) {
    this.payload = this.helper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  public temPermissao(permissao: string): Boolean {
    return this.payload && this.payload.authorities.includes(permissao);
  }

  limparToken() {
    localStorage.removeItem('token');
    this.payload = null;
  }

  temPermissaoRequerida(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.salvarToken(response.json().access_token);
        console.log('Access token criado!');
      })
      .catch(error => console.log('Erro ao obter novo access token', error));
  }

  tokenExpirado() {

    const token = localStorage.getItem('token');
    return !token || this.helper.isTokenExpired(token);

  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));


    if (token) {
      this.salvarToken(token);
    }

  }

}
