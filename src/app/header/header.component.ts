import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public api: ApiService) {}

  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  productAmount: number = this.api.cartItemAmount;
  // loadProductData(): void {
  //   this.api.getCartProduct().subscribe(res => {
  //     this.productList = res;
  //   })
  //   console.log('header loadData')
  // }

  navbarActive(url: string): void {
    $('.header__navbar-item').removeClass('header__navbar-item--active');
    $('.href-' + url.slice(22)).addClass('header__navbar-item--active');
  }

  showSidebar(): void {
    $('.side-bar').css('display', 'block');
    $('.side-bar__block').css('transform', 'translateX(300px)');
  }
  hideSidebar(): void {
    $('.side-bar').css('display', 'none');
    $('.side-bar__block').css('transform', 'translateX(-300px)');
  }
  ngOnInit(): void {
    // this.loadProductData()
    this.api.updateCartItem();
    $('.header__menu-bar').click(this.showSidebar);
    $('.side-bar__item').click(this.hideSidebar);
    $('.side-bar__mask').click(this.hideSidebar);
    this.api.getCartItem();

    $('.item-amount__item').click((e) => {
      e.preventDefault();
    });
  }

  ngDoCheck(): void {
    // this.navbarActive(window.location.href);
    if (window.location.href == 'https://marchoecommerce.web.app/home') {
      $('.header__navbar-item').removeClass('header__navbar-item--active');
      $('.href-home').addClass('header__navbar-item--active');
    }
    if (window.location.href == 'https://marchoecommerce.web.app/shop') {
      $('.header__navbar-item').removeClass('header__navbar-item--active');
      $('.href-shop').addClass('header__navbar-item--active');
    }
    if (window.location.href == 'https://marchoecommerce.web.app/page') {
      $('.header__navbar-item').removeClass('header__navbar-item--active');
      $('.href-page').addClass('header__navbar-item--active');
    }
    if (window.location.href == 'https://marchoecommerce.web.app/blog') {
      $('.header__navbar-item').removeClass('header__navbar-item--active');
      $('.href-blog').addClass('header__navbar-item--active');
    }
    if (window.location.href == 'https://marchoecommerce.web.app/contact') {
      $('.header__navbar-item').removeClass('header__navbar-item--active');
      $('.href-contact').addClass('header__navbar-item--active');
    }
    if (window.location.href == 'https://marchoecommerce.web.app/cart') {
      $('.header__navbar-item').removeClass('header__navbar-item--active');
    }
  }
}
