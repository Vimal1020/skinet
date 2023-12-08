import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/models/address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent{

  @Input() checkoutForm: FormGroup | any;

  constructor(private accountService: AccountService, private toastr: ToastrService){}
 

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe((address : IAddress) => {
        this.toastr.success('Address Saved');
        this.checkoutForm.get('addressFrom').reset(address);
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      })
  }
}
