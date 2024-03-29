import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit{

  basketTotals$:Observable<IBasketTotals | null>|undefined;
  basket$ : Observable<IBasket> | undefined;

  constructor(private basketService: BasketService){}
  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotal$;
    this.basketService.basket$.subscribe(basket => {
      if (basket !== null) {
       
        this.basket$ = of(basket);
      } else {
     
      }
    });
  }

  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrememntItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

}
