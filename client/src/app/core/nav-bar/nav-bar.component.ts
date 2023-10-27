import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  basket$!: Observable<IBasket>;
  currentUser$!: Observable<IUser| null>;
constructor(private basketService: BasketService, private accountService: AccountService) {}

ngOnInit(): void {
  this.basketService.basket$.subscribe(basket => {
    if (basket !== null && this.currentUser$ !== null) {
     this.currentUser$ = this.accountService.currentUser$;
      this.basket$ = of(basket);
    } else {
   
    }
  });
}

logout(){
  this.accountService.logout();
}
}
