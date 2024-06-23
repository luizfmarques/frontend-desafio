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
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
