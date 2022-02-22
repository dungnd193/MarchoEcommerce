import { Component, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService) {}

  public products: any;
  pageNumber: number = 1;
  cartProduct: any;
  days: number = 28;
  hours: number = 8;
  minitues: number = 58;
  seconds: number = 10;
  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  autoSlideTime: any = setInterval(() => {
    $('.slide-next').trigger('click');
  }, 3000);

  nextSlide(): void {
    // Xu ly cho nut position
    var idx = $('.banner-position-item--active').index() + 1;
    $('.banner-position-item').removeClass('banner-position-item--active');
    if (idx === $('.banner-img__slide').length) {
      idx = 0;
    }
    $('.banner-position-item:nth-child(' + (idx + 1) + ')').addClass(
      'banner-position-item--active'
    );

    // Xu ly cho slide
    let nextSlide = $('.banner-img__slide--active').next();
    if (nextSlide.length == 0) {
      $('.banner-img__slide--active')
        .addClass('banner-img__slide-next')
        .one('webkitAnimationEnd', () => {
          $('.banner-img__slide-next').removeClass('banner-img__slide-next');
        });
      $('.banner-img__slide:first-child')
        .addClass('banner-img__slide-right')
        .one('webkitAnimationEnd', () => {
          //bo active di
          $('.banner-img__slide--active').removeClass(
            'banner-img__slide--active'
          );
          //Cho slide sau duoc active
          $('.banner-img__slide-right')
            .addClass('banner-img__slide--active')
            .removeClass('banner-img__slide-right');
        });
    } else {
      // addClass ban dau
      $('.banner-img__slide--active')
        .addClass('banner-img__slide-next')
        .one('webkitAnimationEnd', () => {
          $('.banner-img__slide-next').removeClass('banner-img__slide-next');
        });
      nextSlide
        .addClass('banner-img__slide-right')
        .one('webkitAnimationEnd', () => {
          //bo active di
          $('.banner-img__slide--active').removeClass(
            'banner-img__slide--active'
          );
          //Cho slide sau duoc active
          $('.banner-img__slide-right')
            .addClass('banner-img__slide--active')
            .removeClass('banner-img__slide-right');
        });
    }
  }

  prevSlide(): void {
    // Xu ly cho nut position
    var idx = $('.banner-position-item--active').index() + 1;
    $('.banner-position-item').removeClass('banner-position-item--active');
    if (idx === 1) {
      idx = $('.banner-img__slide').length + 1;
    }
    $('.banner-position-item:nth-child(' + (idx - 1) + ')').addClass(
      'banner-position-item--active'
    );
    console.log(idx - 1);

    // Xu ly cho slide
    let prevSlide = $('.banner-img__slide--active').prev();
    if (prevSlide.length == 0) {
      $('.banner-img__slide--active')
        .addClass('banner-img__slide-prev')
        .one('webkitAnimationEnd', () => {
          $('.banner-img__slide-prev').removeClass('banner-img__slide-prev');
        });
      $('.banner-img__slide:last-child')
        .addClass('banner-img__slide-left')
        .one('webkitAnimationEnd', () => {
          //bo active di
          $('.banner-img__slide--active').removeClass(
            'banner-img__slide--active'
          );
          //Cho slide sau duoc active
          $('.banner-img__slide-left')
            .addClass('banner-img__slide--active')
            .removeClass('banner-img__slide-left');
        });
    } else {
      // addClass ban dau
      $('.banner-img__slide--active')
        .addClass('banner-img__slide-prev')
        .one('webkitAnimationEnd', () => {
          $('.banner-img__slide-prev').removeClass('banner-img__slide-prev');
        });
      prevSlide
        .addClass('banner-img__slide-left')
        .one('webkitAnimationEnd', () => {
          //bo active di
          $('.banner-img__slide--active').removeClass(
            'banner-img__slide--active'
          );
          //Cho slide sau duoc active
          $('.banner-img__slide-left')
            .addClass('banner-img__slide--active')
            .removeClass('banner-img__slide-left');
        });
    }
    clearInterval(this.autoSlideTime);
  }

  handlePositionSlide(e: any): void {
    $('.banner-position-item').removeClass('banner-position-item--active');
    $(e.target).addClass('banner-position-item--active');
    // Code xu ly cho slide

    //Cho slide hien tai bien mat
    $('.banner-img__slide--active')
      .addClass('banner-img__slide-next')
      .one('webkitAnimationEnd', () => {
        $('.banner-img__slide-next').removeClass('banner-img__slide-next');
      });

    $('.banner-img__slide:nth-child(' + ($(e.target).index() + 1) + ')')
      .addClass('banner-img__slide-right')
      .one('webkitAnimationEnd', () => {
        //bo active di
        $('.banner-img__slide--active').removeClass(
          'banner-img__slide--active'
        );
        //Cho slide sau duoc active
        $('.banner-img__slide-right')
          .addClass('banner-img__slide--active')
          .removeClass('banner-img__slide-right');
      });
  }

  loadMore(): void {
    // if(!(this.pageNumber*3 == this.products.length)) {
    this.pageNumber++;
    // }
    this.loadData(this.pageNumber);
  }

  loadData(data: number | undefined): void {
    this.api.getMoreProduct(data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addProduct(product: any): void {
    this.api.getCartProduct().subscribe((res) => {
      this.cartProduct = res;
      if (this.cartProduct.length != 0) {
        this.cartProduct.map((item: any) => {
          if (item.id != product.id) {
            this.api.add(product).subscribe((res) => {
              // this.loadData(this.currentPage)
              $('.toast--success')
                .addClass('slide-in-left')
                .one('webkitAnimationEnd', () => {
                  $('.toast--success').removeClass('slide-in-left');
                  $('.toast--success')
                    .addClass('fade-out')
                    .one('webkitAnimationEnd', () => {
                      $('.toast--success').removeClass('fade-out');
                    });
                });
              this.api.updateCartItem();
              this.api.getCartItem();
            });
          } else {
            $('.toast--error')
              .addClass('slide-in-left')
              .one('webkitAnimationEnd', () => {
                $('.toast--error').removeClass('slide-in-left');
                $('.toast--error')
                  .addClass('fade-out')
                  .one('webkitAnimationEnd', () => {
                    $('.toast--error').removeClass('fade-out');
                  });
              });
          }
        });
      } else {
        this.api.add(product).subscribe((res) => {
          // this.loadData(this.currentPage)
          $('.toast--success')
            .addClass('slide-in-left')
            .one('webkitAnimationEnd', () => {
              $('.toast--success').removeClass('slide-in-left');
              $('.toast--success')
                .addClass('fade-out')
                .one('webkitAnimationEnd', () => {
                  $('.toast--success').removeClass('fade-out');
                });
            });
          this.api.updateCartItem();
          this.api.getCartItem();
        });
      }
    });
  }

  autoPlayVideo(vcode: any) {
    'use strict';
    $('.trending-fashion__video-block').html(
      '<iframe width="480"+ height="480" src="https://www.youtube.com/embed/' +
        vcode +
        '?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>'
    );
  }

  ngOnInit(): void {
    $(window).scrollTop(0);
    this.loadData(this.pageNumber);

    $('.slide-next').click(this.nextSlide);

    $('.slide-prev').click(this.prevSlide);

    $('.banner-position-item').click((e) => {
      this.handlePositionSlide(e);
    });

    $(window).resize(() => {
      $('.banner-img').height($('.banner-img__slide').width() + 'px');
      // $('.banner').height($('.banner-img__slide').width() + 'px')
    });
    $('.banner-img').height($('.banner-img__slide').width() + 'px');

    $('.trending-fashion__play-btn').click(() => {
      console.log('video clicked !');
      this.autoPlayVideo('AXOfw9x-hVw');
    });

    setInterval(() => {
      this.seconds--;
    }, 1000);
  }

  ngDoCheck(): void {
    if (this.seconds == 0) {
      this.seconds = 60;
      this.minitues--;
    }
    if (this.minitues == 0) {
      this.minitues = 60;
      this.hours--;
    }
    if (this.hours == 0) {
      this.hours = 24;
      this.days--;
    }
    if (this.days == 0) {
    } else {
      this.days = new Date($.now()).getMonth() + 1;
    }
  }
}
