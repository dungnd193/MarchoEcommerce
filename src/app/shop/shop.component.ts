import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(private api: ApiService) {}
  products: any;
  searchProducts: any[] = [];
  allProduct: any;
  currentPage: number = 1;
  pageNumber: number = 1;
  cartProduct: any;
  inputVal = '';
  toggleBool = false;
  @Input() cartItemNumber = 0;
  firstPrice: number = 0;
  priceProgress: number = 0;
  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  isFashionCategoryClicked = false;
  isShoesCategoryClicked = false;
  isBagCategoryClicked = false;
  isSaleCategoryClicked = false;
  arrColor: any;
  whiteColorAmount!: number;
  blueColorAmount!: number;
  redColorAmount!: number;
  greenColorAmount!: number;
  orangeColorAmount!: number;
  blackColorAmount!: number;
  purpleColorAmount!: number;
  greyColorAmount!: number;
  fashionAmount!: number;
  shoesAmount!: number;
  bagAmount!: number;
  saleAmount!: number;

  prevPage(): void {
    if (this.currentPage != 1) {
      this.currentPage--;
      $(window).scrollTop(Number($('.right-content').offset()?.top));
      $('.pagination-item__link-next').attr(
        'style',
        'color: #9C9C9C !important'
      );
    }
    if (this.currentPage == 1) {
      $('.pagination-item__link-prev').attr(
        'style',
        'color: #ddd !important; cursor: default'
      );
    }
    if ($('.select-sort').val() == 'default') {
      this.loadData(this.currentPage);
    }
    if ($('.select-sort').val() == 'desc') {
      this.sortByDesc(this.currentPage);
    }
    if ($('.select-sort').val() == 'asc') {
      this.sortByAsc(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageNumber) {
      this.currentPage++;
      $(window).scrollTop(Number($('.right-content').offset()?.top));
      $('.pagination-item__link-prev').attr(
        'style',
        'color: #9C9C9C !important'
      );
    }
    if (this.currentPage == this.pageNumber) {
      $('.pagination-item__link-next').attr(
        'style',
        'color: #ddd !important; cursor: default'
      );
    }
    // if ($('.left-sidebar__category-group--selected').data('category'))

    if ($('.select-sort').val() == 'default') {
      this.loadData(this.currentPage);
    }
    if ($('.select-sort').val() == 'desc') {
      this.sortByDesc(this.currentPage);
    }
    if ($('.select-sort').val() == 'asc') {
      this.sortByAsc(this.currentPage);
    }
    console.log(this.currentPage);
  }

  loadData(data: number | undefined): void {
    this.api.getShopProduct(data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProductAmount(): void {
    this.api.getAllProducts().subscribe(
      (res) => {
        this.allProduct = res;
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

  sortByDefault() {
    console.log('Sorting by default');
    this.loadData(this.currentPage);
  }

  sortByAsc(data: number | undefined) {
    console.log('Sorting by asc');
    this.api.getProductByASC(data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sortByDesc(data: number | undefined) {
    console.log('Sorting by asc');
    this.api.getProductByDESC(data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadSaleProduct(data: number | undefined) {
    this.api.getSaleProduct(data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadDataFromCategory(category: string, data: number | undefined) {
    this.api.getProductByCategory(category, data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadDataFromColor(color: string, data: number | undefined) {
    this.api.getProductByColor(color, data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  log(color: string) {
    console.log(color);
  }

  getColorAmount(color: string) {
    let amount = 0;
    this.api.getAllProducts().subscribe((res) => {
      this.arrColor = res;
      this.arrColor.map((product: any) => {
        if (product.color === color) {
          amount++;
        }
        if (color == 'white') {
          this.whiteColorAmount = amount;
        }
        if (color == 'blue') {
          this.blueColorAmount = amount;
        }
        if (color == 'red') {
          this.redColorAmount = amount;
        }
        if (color == 'green') {
          this.greenColorAmount = amount;
        }
        if (color == 'orange') {
          this.orangeColorAmount = amount;
        }
        if (color == 'black') {
          this.blackColorAmount = amount;
        }
        if (color == 'purple') {
          this.purpleColorAmount = amount;
        }
        if (color == 'grey') {
          this.greyColorAmount = amount;
        }
      });
      // console.log(color + ' : ' + amount)
    });
    // return amount;
  }

  getCategoryAmount(category: string) {
    let amount = 0;
    this.api.getAllProducts().subscribe((res) => {
      this.arrColor = res;
      this.arrColor.map((product: any) => {
        if (product.category === category) {
          amount++;
        }
        if (category == 'fashion') {
          this.fashionAmount = amount;
        }
        if (category == 'shoes') {
          this.shoesAmount = amount;
        }
        if (category == 'bag') {
          this.bagAmount = amount;
        }
        if (category == 'sale') {
          this.api.getAllSaleProduct().subscribe((res) => {
            this.saleAmount = res.length;
          });
        }
      });
      // console.log(color + ' : ' + amount)
    });
    // return amount;
  }

  loadSearchProduct(inputVal: any) {
    this.api.getAllProducts().subscribe(
      (res) => {
        this.searchProducts = [];
        this.products = res;
        let count = 0;
        this.products.map((p: any) => {
          if (p.title.includes(inputVal)) {
            const checkExists = this.searchProducts.some((item: any) => {
              return item.id == p.id;
            });
            if (!checkExists) {
              this.searchProducts.push(p);
            }
            count++;
          }
          if (count == 0) {
            console.log('ko tim thay');
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  toggle(event: any) {
    this.toggleBool === false
      ? (this.toggleBool = true)
      : (this.toggleBool = false);
    this.toggleBool
      ? $('.left-sidebar__search-result').css('display', 'block')
      : $('.left-sidebar__search-result').css('display', 'none');
  }
  loadProductByPriceFilter(limit: number, data: number | undefined) {
    this.api.getProductByPriceFilteR(limit, data).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    $(window).scrollTop(0);
    this.loadData(this.currentPage);
    this.getProductAmount();
    $('.pagination-item__link-prev').attr(
      'style',
      'color: #ddd !important; cursor: default'
    );

    $('.select-sort').change(() => {
      if ($('.select-sort').val() == 'default') {
        this.loadData(this.currentPage);
      }
      if ($('.select-sort').val() == 'desc') {
        this.sortByDesc(this.currentPage);
      }
      if ($('.select-sort').val() == 'asc') {
        this.sortByAsc(this.currentPage);
      }
    });
    $('.price-progress')
      .on('input', (e) => {
        var min = $('.price-progress').attr('min');
        var max = $('.price-progress').attr('max');
        var val = $('.price-progress').val();
        var percent =
          Number(val) - (Number(min) * 100) / Number(max) - Number(min);
        this.priceProgress = percent;
        $(e.target).css({
          backgroundSize: percent + '% 100%',
        });
      })
      .trigger('input');
    $('.price-progress-mb')
      .on('input', (e) => {
        var min = $('.price-progress-mb').attr('min');
        var max = $('.price-progress-mb').attr('max');
        var val = $('.price-progress-mb').val();
        var percent =
          Number(val) - (Number(min) * 100) / Number(max) - Number(min);
        this.priceProgress = percent;
        $(e.target).css({
          backgroundSize: percent + '% 100%',
        });
      })
      .trigger('input');

    $('.side-bar-mobile__mask').click(() => {
      $('.side-bar-mobile').css('display', 'none');
    });

    $('.left-sidebar-mobile').click(() => {
      $('.side-bar-mobile').css('display', 'block');
    });

    $('.left-sidebar__search-input').on('input', (e) => {
      var timeout;
      if (timeout) {
        clearTimeout(timeout);
      }
      // timeout = setTimeout(() => {
      this.loadSearchProduct(this.inputVal);
      // }, 1000)
    });

    $('.left-sidebar__category-group').click((e) => {
      $('.left-sidebar__category-group').removeClass(
        'left-sidebar__category-group--selected'
      );
      $(e.target).addClass('left-sidebar__category-group--selected');
      if ($(e.target).data('category') == 'sale') {
        this.loadSaleProduct(this.currentPage);
      } else {
        this.loadDataFromCategory(
          $(e.target).data('category'),
          this.currentPage
        );
      }
    });

    $('.left-sidebar__color-filter-group').click((e) => {
      $('.left-sidebar__color-filter-group').removeClass(
        'left-sidebar__color-filter-group--selected'
      );
      $(e.target).addClass('left-sidebar__color-filter-group--selected');
      this.loadDataFromColor($(e.target).data('color'), this.currentPage);
    });

    this.getColorAmount('white');
    this.getColorAmount('blue');
    this.getColorAmount('red');
    this.getColorAmount('green');
    this.getColorAmount('orange');
    this.getColorAmount('black');
    this.getColorAmount('purple');
    this.getColorAmount('grey');

    this.getCategoryAmount('fashion');
    this.getCategoryAmount('shoes');
    this.getCategoryAmount('bag');
    this.getCategoryAmount('sale');
  }

  ngDoCheck(): void {
    this.pageNumber = Math.ceil(this.allProduct?.length / 6);
  }
}
