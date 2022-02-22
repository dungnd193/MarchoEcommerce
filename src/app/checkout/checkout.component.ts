import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private api: ApiService) {}
  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  products: any;
  subTotal: number = 0;
  couponCodeValue: number = 0;
  isCheckPayment: boolean = true;

  loadProductData() {
    this.subTotal = 0;
    this.api.getCartProduct().subscribe(
      (res) => {
        this.products = res;
        this.products.map((item: any) => {
          this.subTotal! += item.quantity * item.price.new;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  clearShoppingCart() {
    this.api.getCartProduct().subscribe((res) => {
      this.products = res;
      this.products.map((product: any) => {
        this.api.removeProduct(product.id).subscribe((res) => {
          this.loadProductData();
          this.api.updateCartItem();
        });
      });
    });
  }

  formContact: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.email),
    note: new FormControl(''),
  });

  order() {
    if (this.formContact.invalid) {
      alert('Khong thanh cong');
    } else {
      alert('Thanh cong');
      let obj = this.formContact.value;
      obj = {
        ...obj,
        order: this.products,
        total: this.subTotal - this.subTotal * this.couponCodeValue,
        payment: $('#check-payment').prop('checked')
          ? 'Check Payment'
          : 'Paypal',
      };
      this.api.addOrder(obj).subscribe((res) => {
        this.clearShoppingCart();
      });
      $('.contact-information__input').val('');
      $(window).scrollTop(0);
    }
  }

  ngOnInit(): void {
    this.loadProductData();
    $(window).scrollTop(0);
    $('#check-payment').prop('checked', this.isCheckPayment);
    $('#paypal').click(() => {
      if (this.isCheckPayment) {
        this.isCheckPayment = !this.isCheckPayment;
        $('#paypal').prop('checked', !this.isCheckPayment);
        $('#check-payment').prop('checked', this.isCheckPayment);
      }
    });
    $('#check-payment').click(() => {
      if (!this.isCheckPayment) {
        this.isCheckPayment = !this.isCheckPayment;
        $('#check-payment').prop('checked', this.isCheckPayment);
        $('#paypal').prop('checked', !this.isCheckPayment);
      }
    });
    this.couponCodeValue = this.api.getCounponCode();
    $('.banner-details__heading').click(() => {
      console.log('code:' + this.couponCodeValue);
    });
  }
}
