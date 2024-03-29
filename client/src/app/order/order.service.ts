import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
  getOrder(){
    return this.http.get<IOrder[]>(this.baseUrl + 'orders/ordersForUser');
  }

  getOrderDetail(id : number)
  {
    return this.http.get(this.baseUrl + 'orders/' + id);
  }
}
