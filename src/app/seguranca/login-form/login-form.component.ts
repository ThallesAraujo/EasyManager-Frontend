import { Component, OnInit } from '@angular/core';
import { OauthService } from '../oauth.service';
import { ErrorHandlerService } from '../../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private oauth: OauthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login(usuario: string, senha: string) {
    this.oauth.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/lancamentos']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
