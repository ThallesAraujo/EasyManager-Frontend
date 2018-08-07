import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Conta de Água',
      dataVencimento: new Date(2018, 7, 4),
      dataPagamento: null,
      valor: 24.75,
      pessoa: 'CAGEPA'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Salário',
      dataVencimento: null,
      dataPagamento: new Date(2018, 7, 25),
      valor: 8570.22,
      pessoa: 'Megadev S.A.'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Supermercado',
      dataVencimento: new Date(2018, 7, 4),
      dataPagamento: null,
      valor: 750.00,
      pessoa: 'Supermercado Bom Demais'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Conta de Luz',
      dataVencimento: new Date(2018, 7, 6),
      dataPagamento: new Date(2018, 7, 9),
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
