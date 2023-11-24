import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { IOrder } from '../shared/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  orders: IOrder[] | any;
  ngOnInit(){
    this.OrderView();
  }

  constructor(private orderService: OrderService){}

  OrderView(){
    this.orderService.getOrder().subscribe((orders : IOrder[])=>{
      if(orders)
      {
        this.orders = orders;
      }}, error =>{
        console.log(error);
    });
  }
}
