import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/models/basket';
import { NavigationExtras, Router } from '@angular/router';

declare var Stripe: (arg0: string) => any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy{
  @Input() checkoutForm : FormGroup| any;
  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef | undefined;
  
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef | undefined;
  
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef | undefined;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler =  this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  constructor(private basketService: BasketService, 
  private checkoutService: CheckoutService,
  private toastr: ToastrService, 
  private router: Router){}
  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51OFwQjSCSMsRqYbGFUmxIXBKSYUpb4nt9S7CsG2rwUYSyXMj4EUR9ZUj2eC7yUIH0Nf53QfRRNo3cjRdLASNrqiM00BRDAo0GR');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement?.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);
    
    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);
    
    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement?.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
    
  }
  ngOnDestroy(){
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event: any) {
    console.log(event);
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
  
    switch (event.elementType) {
        case 'cardNumber':
          this.cardNumberValid = event.complete;
          break;
        case 'cardExpiry':
          this.cardExpiryValid = event.complete;
          break;
        case 'cardCvc':
          this.cardCvcValid = event.complete;
          break;
    }
}

async submitOrder() {
  this.loading = true;
  const basket = this.basketService.getCurrentBasketValue();

  try {
    if (basket) {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent && basket.id) {
        this.basketService.deleteBasket(basket);

        const navigateExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigateExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
    } else {
      console.log("basket is null"); 
       }

    this.loading = false;
  } catch (error) {
    console.log(error);
    this.loading = false;
  }
}

  private async confirmPaymentWithStripe(basket : IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret,{
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    });
  }
  private async createOrder(basket: IBasket) {
    if (basket) {
      var orderToCreate = this.getOrderToCreate(basket);
      const createdOrder = await this.checkoutService.createOrder(orderToCreate).toPromise();
      return createdOrder;
    }
    return { error: "Basket is null" };
  }
  
  
  
  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id ? basket.id : '',
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value    
    };
  }
  
}
