import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit{

  deliveryMethods : IDeliveryMethod[] | undefined;
  @Input() checkoutForm: FormGroup | any;

  constructor(private checkoutService : CheckoutService, private basketService: BasketService){}
  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe((dm : IDeliveryMethod[]) =>{
     this.deliveryMethods = dm;
    }, error =>{
      console.log(error);
    })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);

  }
}
