import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../entidades/pedido';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private server = 'http://localhost:8080/api';
  private apiUrl = `${this.server}/pedidos`;

  constructor(protected http: HttpClient) {}
  buscarTodos(): Observable<Array<Pedido>> {
    console.log(this.apiUrl);
    return this.http.get<Array<Pedido>>(this.apiUrl);
  }

  findById(id: number): Observable<Pedido> {
    console.log(this.apiUrl);
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  calcularImposto(pedido: Pedido){
    return this.http.post<Pedido>(`${this.apiUrl}/calcular-imposto`, pedido);
  } 

  salvarPedido(pedido: Pedido){
    return this.http.post<Pedido>(`${this.apiUrl}`, pedido);
  } 
}
