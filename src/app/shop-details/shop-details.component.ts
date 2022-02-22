import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css'],
})
export class ShopDetailsComponent implements OnInit {
  id: string = '';
  productList: any;
  productMoreList: any;
  commentList: any;
  product: any;
  comments: any = [];
  cartProduct: any;
  rating!: number;
  pageNumber: number = 1;
  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  constructor(private api: ApiService, private router: ActivatedRoute) {}

  formReview: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    body: new FormControl('', Validators.required),
  });

  getAllProducts() {
    this.api.getAllProducts().subscribe((res) => {
      this.productList = res;
      this.productList.map((item: any) => {
        if (item.id == this.id) {
          this.product = item;
        }
        // console.log(item)
      });
    });
  }
  getComment() {
    this.comments = [];
    this.api.getComment().subscribe((res) => {
      this.commentList = res;
      this.commentList.map((cmt: any) => {
        if (cmt.postId == this.id) {
          this.comments.push(cmt);
        }
      });
    });
  }
  loadData(data: number | undefined): void {
    this.api.getMoreProduct(data).subscribe(
      (res) => {
        this.productMoreList = res;
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
              // this.loadData()
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
          // this.loadData()
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
  addReview() {
    if (this.formReview.invalid) {
      alert('Vui lòng nhập đầy đủ thông tin!');
    } else {
      alert('Sending Review Successfully!');
      let obj = this.formReview.value;
      obj = {
        ...obj,
        postId: this.id,
        date: new Date($.now()).toString(),
        rate: this.rating,
      };
      this.api.addReview(obj).subscribe((res) => {
        this.getComment();
      });
      $('.my-review__name-input').val('');
      $('.my-review__email-input').val('');
      $('.my-review__text-area').val('');
      $(window).scrollTop(0);
    }
  }

  loadMore() {
    this.pageNumber++;
    this.loadData(this.pageNumber);
  }

  ngOnInit(): void {
    console.log('shop-details');
    this.getAllProducts();
    this.getComment();
    this.loadData(this.pageNumber);
    this.id = this.router.snapshot.params['id'];

    $(window).scrollTop(0);
    $('.my-review__heading').click(() => {
      console.log(this.comments);
    });

    $('.my-review__rating-one-star').click(() => {
      this.rating = 1;
      $('.rating-group').removeClass('my-review__rated');
      $('.my-review__rating-one-star').addClass('my-review__rated');
    });

    $('.my-review__rating-two-star').click(() => {
      this.rating = 2;
      $('.rating-group').removeClass('my-review__rated');
      $('.my-review__rating-two-star').addClass('my-review__rated');
    });

    $('.my-review__rating-three-star').click(() => {
      this.rating = 3;
      $('.rating-group').removeClass('my-review__rated');
      $('.my-review__rating-three-star').addClass('my-review__rated');
    });

    $('.my-review__rating-four-star').click(() => {
      this.rating = 4;
      $('.rating-group').removeClass('my-review__rated');
      $('.my-review__rating-four-star').addClass('my-review__rated');
    });

    $('.my-review__rating-five-star').click(() => {
      this.rating = 5;
      $('.rating-group').removeClass('my-review__rated');
      $('.my-review__rating-five-star').addClass('my-review__rated');
    });
  }
}
