import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../models/basket';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit{
@Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
@Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
@Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
 @Input() isBasket = true;
 basket$ : Observable<IBasket> | undefined;
  constructor(private basketService: BasketService){}
  ngOnInit(): void {
    this.basketService.basket$.subscribe(basket => {
      if (basket !== null) {
        this.basket$ = of(basket);
      } else {
      }
    });
  }

  decrememntItemQuantity(item : IBasketItem){
    this.decrement.emit(item);
  }
  incrementItemQuantity(item : IBasketItem){
    this.increment.emit(item);
  }
  removeBasketItem(item : IBasketItem){
    this.remove.emit(item);
  }

}
