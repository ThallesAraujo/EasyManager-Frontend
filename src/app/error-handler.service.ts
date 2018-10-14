import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { OauthService } from './seguranca/oauth.service';
import { ExpiredSessionError } from './seguranca/auth-interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private oauth: OauthService,
    private router: Router
    ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof ExpiredSessionError) {
      console.log('Caiu no erro');
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse.status >= 400 && errorResponse.status <= 499){
      let errors;
      msg = 'Erro ao processar solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão p/ executar esta ação';
      }

      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch (e) {
        console.error('Houve um erro', errorResponse);
      }
    } else {
      msg = 'Erro ao processar serviço remoto. Tente atualizar a página';
      console.error('Houve um erro', errorResponse);
    }

    this.messageService.add({severity: 'error', detail: msg});

  }

}
