import { Item } from "./item";

export interface Pedido {
  id: number;
  clientName: string;
  cnpjOuCpf: string;
  tipo: string;
  dataCompra: Date;
  dataStr?: String;
  valorItens: number;
  valorTotal: number;
  imposto: number;
  itens: Item[];
}
