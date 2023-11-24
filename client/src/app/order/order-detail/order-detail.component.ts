import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
order: IOrder| any;
constructor(private route: ActivatedRoute,
   private breadcrumbService: BreadcrumbService, 
  private orderService: OrderService){
    this.breadcrumbService.set('@OrderDetailed', '');
  }

  ngOnInit() {
    // Extracting the 'id' parameter from the route snapshot
    const orderIdParam = this.route.snapshot.paramMap.get('id');
    
    // Check if orderIdParam is not null or undefined before converting to a number
    if (orderIdParam !== null && orderIdParam !== undefined) {
      const orderId = +orderIdParam; // The '+' is used to convert the string to a number
  
      // Fetching order details using the orderService
      this.orderService.getOrderDetail(orderId).subscribe(
        // Success callback
        (order: IOrder | any) => {
          // Assigning the retrieved order to the component's 'order' property
          this.order = order;
  
          // Setting the breadcrumb using the breadcrumbService
          this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
        },
        // Error callback
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Invalid or missing order ID');
    }
  }
  
}
