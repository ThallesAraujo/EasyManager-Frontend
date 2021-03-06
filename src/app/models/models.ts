export class Pessoa {
  id: number;
  nome: string;
  endereco = new Endereco();
}

export class Categoria {
  codigo: number;
  nome: String;
}

export class Lancamento {

  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();

}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
