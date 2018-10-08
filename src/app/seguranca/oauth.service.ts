import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: Http) { }

  oauthUrl = 'http://localhost:8080/oauth/token';

  login(usuario: string, senha: string): Promise<void>{

    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `&client=angular&username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthUrl, body, { headers })
    .toPromise()
    .then( response => {
      console.log(response);
    })
    .catch( response => {
      console.log(response);

    });

  }

}
