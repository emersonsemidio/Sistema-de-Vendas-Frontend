export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  imagemUrl: string;

  mercadoId: number;
}
