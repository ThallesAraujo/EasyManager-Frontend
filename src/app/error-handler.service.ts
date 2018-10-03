import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      const erros = JSON.parse(errorResponse._body);
      msg = erros[0].mensagemUsuario;
      //msg = errorResponse;
      console.log('Detalhes do erro:', errorResponse);
    }

    this.messageService.add({severity: 'error', detail: msg});

  }

}
