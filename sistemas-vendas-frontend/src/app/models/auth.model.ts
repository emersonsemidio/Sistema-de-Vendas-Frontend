// Interface para cada item do carrinho
interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
}


export interface AuthResponse {
  token: string;
  cliente: Cliente;
}
