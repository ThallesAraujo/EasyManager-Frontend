import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent {

  tiposLancamento = [
    { label: 'Despesa', value: 'DESPESA' },
    { label: 'Receita', value: 'RECEITA' }
  ];
}
