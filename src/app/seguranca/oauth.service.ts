import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    private http: Http,
    private helper: JwtHelper
    ) {
      this.carregarToken();
    }

  payload: any;

  oauthUrl = 'http://localhost:8080/oauth/token';

  login(usuario: string, senha: string): Promise<void>{

    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `&client=angular&username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthUrl, body, { headers , withCredentials: true})
    .toPromise()
    .then( response => {
      this.salvarToken(response.json().access_token);
    })
    .catch( response => {
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

  private temPermissao(permissao: string): Boolean {
    return this.payload && this.payload.authorities.includes(permissao);
  }
  private obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthUrl, body, {headers, withCredentials: true})
    .toPromise()
    .then(response => {
      this.salvarToken(response.json().access_token);
      console.log('Access token criado!');
    })
    .catch(error => console.log('Erro ao obter novo access token', error));
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));


    if (token) {
      this.salvarToken(token);
    }

  }

}
