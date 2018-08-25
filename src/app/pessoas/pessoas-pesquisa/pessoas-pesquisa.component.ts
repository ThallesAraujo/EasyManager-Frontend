import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    {
      'nome': 'Débora Araújo',
      'cidade': 'Taguatinga',
      'estado': 'DF',
      'ativo' : true
    },
    {
      'nome': 'Rafael Fernandes',
      'cidade': 'Sobradinho',
      'estado': 'DF',
      'ativo' : false
    },
    {
      'nome': 'Felipe S. Martins',
      'cidade': 'Ceilândia',
      'estado': 'DF',
      'ativo' : true
    },
    {
      'nome': 'Jaqueline Santos',
      'cidade': 'Gama',
      'estado': 'DF',
      'ativo' : true
    }
  ];

}
