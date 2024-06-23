import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PedidoService } from './services/pedido.service';
import { Pedido } from './entidades/pedido';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private service: PedidoService) {}
  ngOnInit(): void {
    this.service.buscarTodos().subscribe(
      (response) => {
        this.listaPedidos = response;
        console.log('Dados deletados', response);
      },
      (error) => {
        console.error('Erro ao deletar dados', error);
      }
    );
  }

  exibirModal = true
  listaPedidos: Array<Pedido> = [
    {
      id: 1,
      clientName: 'Luiz',
      dataCompra: new Date('24/06/2024'),
      cnpjOuCpf: '123',
      valorTotal: 10,
    },
    {
      id: 2,
      clientName: 'Luiz',
      dataCompra: new Date('24/06/2024'),
      cnpjOuCpf: '123',
      valorTotal: 10,
    },
  ];
}
