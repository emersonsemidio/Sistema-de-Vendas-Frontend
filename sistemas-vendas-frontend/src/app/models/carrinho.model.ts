import { Produto } from "./produto.model";

// Interface para cada item do carrinho
interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  totalItem: number;
}

// Carrinho completo
interface Carrinho {
  itens: ItemCarrinho[];
  total: number;
  quantidadeItens: number;
}