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

  categorias = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 }
  ];

  pessoas = [
    { label: 'Sônia L. Cavalcanti', value: 1 },
    { label: 'Antônio J. Filho', value: 2 },
    { label: 'Débora N. Santos', value: 3  },
  ];

}
