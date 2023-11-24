import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/models/basket';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit{

  @Input() checkoutForm : FormGroup| any;
constructor(private basketService: BasketService, 
  private checkoutService: CheckoutService,
  private toastr: ToastrService, 
  private router: Router){}
  ngOnInit(): void {
  }

  submitOrder() {
    let orderToCreate: any;
    const basket = this.basketService.getCurrentBasketValue();
  
    if (basket) {
      // Ensure that the id property is not undefined before passing it to getOrderToCreate
      if (basket.id) {
        orderToCreate = this.getOrderToCreate(basket);
  
        if (orderToCreate) {
          this.checkoutService.createOrder(orderToCreate).subscribe(
            (order: any) => {
              this.toastr.success('Order Created Successfully');
              
              if (basket.id) {
                this.basketService.deleteLocalBasket(basket.id);
              }
              const navigateExtras : NavigationExtras = {state:  order};
              this.router.navigate(['checkout/success'], navigateExtras);
              console.log(order);
            },
            (error) => {
              this.toastr.error(error.message);
              console.log(error);
            }
          );
        } else {
          console.error('Error creating order: getOrderToCreate returned undefined');
        }
      } else {
        console.error('Error creating order: Basket id is undefined');
      }
    } else {
      console.error('Error creating order: Basket is null');
    }
  }
  
  
  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value    
    };
  }
}
