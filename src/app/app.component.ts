import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Conta de Água',
      dataVencimento: '04/07/2018',
      dataPagamento: null,
      valor: 24.75,
      pessoa: 'CAGEPA'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Salário',
      dataVencimento: null,
      dataPagamento: '25/07/2018',
      valor: 8570.22,
      pessoa: 'Megadev S.A.'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Supermercado',
      dataVencimento: '04/07/2018',
      dataPagamento: null,
      valor: 750.00,
      pessoa: 'Supermercado Bom Demais'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Conta de Luz',
      dataVencimento: '30/07/2018',
      dataPagamento: '11/07/2018',
      valor: 24.75,
      pessoa: 'Energisa S.A.'
    }
  ];

  getStyle(tipo: string) {
    if (tipo === 'DESPESA') {
      return {'color': 'red'};
    } else {
      return {'color': 'blue'};
    }
  }

}
