import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PedidoService } from './services/pedido.service';
import { Pedido } from './entidades/pedido';
import { Item } from './entidades/item';
import { FormGroup, UntypedFormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private service: PedidoService, private builder: UntypedFormBuilder) {}
  ngOnInit(): void {
    this.service.buscarTodos().subscribe(
      (response) => {
        response.forEach(p => p.dataStr = this.formatDate(p.dataCompra))
        this.listaPedidos = response;
      },
      (error) => {
      }
    );
  }

  exibirModal = false;
  pedido?: Pedido;
  formulario?: FormGroup;
  formularioItem?: FormGroup;
  camposDesabilitados = true

  listaPedidos: Array<Pedido> = [];

  listaItens: Array<Item> = [];

  fecharModal(): void {
    this.exibirModal = false;
  }

  carregarItens(idPedido: number): void {
    console.log("teste")
    this.service.findById(idPedido).subscribe(
      (response) => {
        this.pedido = response;
        this.exibirModal = true;
        console.log(response);
        this.popularPedido(this.pedido);
      },
      (error) => {console.error('Erro ao deletar dados', error);
      }
    );
  }

  novoPedido(){
    this.exibirModal = true;
    const novo: Pedido = {clientName: "", cnpjOuCpf: "", dataCompra: new Date(), id: 0, imposto: 0, itens: [], tipo: "CNPJ", valorItens: 0, valorTotal: 0 }
    this.popularPedido(novo);
  }

  novoItem(){
    const novo: Item = {id: 0, descricao: "", valor: 0, quantidade: 0}
    this.popularItem(novo);
  }

  salvarItem(){
    const item = this.formularioItem?.value
    this.listaItens.push(item);
    this.calcularImposto();
    this.novoItem();
  }

  calcularImposto(){
    const pedido = this.formulario?.value
    pedido.itens = this.listaItens
    this.service.calcularImposto(pedido).subscribe((response) => {
      this.pedido = response;
      console.log(response);
      this.popularPedido(this.pedido);
    },
    (error) => {console.error('Erro ao deletar dados', error);
    })
  }

  salvarPedido(){
    const pedido = this.formulario?.value
    pedido.itens = this.listaItens
    this.service.salvarPedido(pedido).subscribe((response) => {
      this.ngOnInit();
      this.exibirModal=false;
    },
    (error) => {console.error('Erro ao deletar dados', error);
    })
  }

  popularPedido(pedido: Pedido){
    this.formulario = this.builder.group({id:[pedido.id], clientName: [pedido.clientName],
      cnpjOuCpf: [pedido.cnpjOuCpf],
      tipo: [pedido.tipo],
      dataCompra: [pedido.dataCompra],
      valorItens: [pedido.valorItens],
      valorTotal: [pedido.valorTotal],
      imposto: [pedido.imposto]})
      this.listaItens= pedido.itens;
  }

  popularItem(item: Item){
    this.formularioItem = this.builder.group({id:[item.id], descricao: [item.descricao],
      quantidade: [item.quantidade],
      valor: [item.valor]})
  }

  deletarPedido(idPedido: number): void {
    this.service.deleteData(idPedido).subscribe(
      () => {
        console.log('Pedido deletado com sucesso');
        this.service.buscarTodos().subscribe(
          (response) => {
            this.listaPedidos = response;
            console.log('Dados atualizados', response);
          },
          (error) => {
            console.error('Erro ao atualizar dados', error);
          }
        );
      },
      (error) => {
        console.error('Erro ao deletar pedido', error);
      }
    );
  }

  formatDate(dt: any) {
    const date = new Date(dt);
    const day = this.padTo2Digits(date.getDate());
    const month = this.padTo2Digits(date.getMonth() + 1);
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
}
