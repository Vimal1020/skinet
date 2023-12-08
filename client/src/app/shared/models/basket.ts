import {v4 as uuid} from 'uuid';
export interface IBasket {
    id?: string
    items?: IBasketItem[]
    clientSecret?: string
    paymentIntentId?: string
    deliveryMethodId?: number 
    shippingPrice?: number 
  }
  
  export interface IBasketItem {
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    brand: string
    type: string
  }

  export class Basket  implements IBasket
  {
      clientSecret?: string | undefined;
      paymentIntentId?: string | undefined;
      deliveryMethodId?: number;
      id = uuid();
      items: IBasketItem[] = [];
  }

  export interface IBasketTotals
  {
    shipping: number;
    subtotal: number;
    total: number
  }
