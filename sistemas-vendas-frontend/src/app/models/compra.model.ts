export interface Compra {
  id?: number;
  cliente?: any; // Você pode criar um modelo Cliente depois
  mercado?: any; // Ou usar Mercado model
  total: number;
  formaPagamento: string;
  status: string;
  itens: ItemVenda[];
}

export interface ItemVenda {
  id?: number;
  produto: any; // Ou usar Produto model
  quantidade: number;
  precoUnitario: number;
  compra?: any;
}
