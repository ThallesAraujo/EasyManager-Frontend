import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { OauthService } from './seguranca/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService, private oauth: OauthService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499){
      let errors;
      msg = 'Erro ao processar solicitação';

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
