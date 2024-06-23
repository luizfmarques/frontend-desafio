export interface Pedido {
  id: number;
  clientName: string;
  cnpjOuCpf: string;
  dataCompra: Date;
  valorTotal: number;
}
