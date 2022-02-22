import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // API products
  PRODUCT_URL = 'http://localhost:3000/products';
  CART_URL = 'http://localhost:3000/cart';
  ORDER_URL = 'http://localhost:3000/order';
  REVIEW_URL = 'http://localhost:3000/reviews';
  couponCode = 0;

  constructor(private http: HttpClient) {}
  cartItemAmount: number = 0;
  productList: any = [];
  cartItemList: any = [];

  getAllProducts() {
    return this.http.get(this.PRODUCT_URL);
  }
  getShopProduct(data: number | undefined): Observable<any> {
    return this.http.get(
      this.PRODUCT_URL + '?_limit=6&_page=' + (data ? data.toString() : '1')
    );
  }
  getMoreProduct(data: number | undefined): Observable<any> {
    return this.http.get(
      this.PRODUCT_URL + '?_limit=' + (data ? (data * 3).toString() : '3')
    );
  }
  getCartProduct() {
    return this.http.get(this.CART_URL);
  }
  getProductByASC(data: number | undefined): Observable<any> {
    return this.http.get(
      this.PRODUCT_URL +
        '?_limit=6&_page=' +
        (data ? data.toString() : '1') +
        '&_sort=price.new&_order=asc'
    );
  }
  getProductByDESC(data: number | undefined): Observable<any> {
    return this.http.get(
      this.PRODUCT_URL +
        '?_limit=6&_page=' +
        (data ? data.toString() : '1') +
        '&_sort=price.new&_order=desc'
    );
  }
  getProductByCategory(
    category: string,
    data: number | undefined
  ): Observable<any> {
    return this.http.get(this.PRODUCT_URL + '?category=' + category);
    // return this.http.get(this.PRODUCT_URL + '?category=' + category + '&_limit=8&_page=' + (data ? data.toString() : '1') )
  }

  getProductByColor(color: string, data: number | undefined): Observable<any> {
    return this.http.get(this.PRODUCT_URL + '?color=' + color);
  }
  getProductByPriceFilteR(limit: number, data: number | undefined) {
    return this.http.get(
      this.PRODUCT_URL + '?price.new_gte=0&price.new_lte=' + limit
    );
  }
  getSaleProduct(data: number | undefined): Observable<any> {
    return this.http.get(this.PRODUCT_URL + '?sale=true');
    // return this.http.get(this.PRODUCT_URL + '?sale=true&_limit=6&_page=' + (data ? data.toString() : '1') )
  }
  getAllSaleProduct(): Observable<any> {
    return this.http.get(this.PRODUCT_URL + '?sale=true');
  }
  getComment() {
    return this.http.get(this.REVIEW_URL);
  }
  add(product: any): Observable<any> {
    return this.http.post(this.CART_URL, product);
  }
  addOrder(order: any): Observable<any> {
    return this.http.post(this.ORDER_URL, order);
  }
  addReview(review: any): Observable<any> {
    return this.http.post(this.REVIEW_URL, review);
  }
  update(id: any, product: any): Observable<any> {
    return this.http.put(this.CART_URL + '/' + id.toString(), product);
  }
  removeProduct(id: any): Observable<any> {
    return this.http.delete(this.CART_URL + '/' + id.toString());
  }

  removeShoppingCart(): Observable<any> {
    return this.http.delete(this.CART_URL);
  }

  updateCartItem() {
    this.getCartProduct().subscribe((res) => {
      this.productList = res;
      this.cartItemAmount = this.productList.length;
      // console.log('productList.length:'+this.productList.length);
    });
  }

  getCartItem() {
    this.getCartProduct().subscribe((res) => {
      this.cartItemList = res;
    });
  }

  setCouponCode(code: number) {
    this.couponCode = code;
  }

  getCounponCode() {
    return this.couponCode;
  }

  ngOnInit(): void {}
  ngDoCheck(): void {}
}
