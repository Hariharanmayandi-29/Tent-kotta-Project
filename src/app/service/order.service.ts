
import { Injectable, OnInit } from '@angular/core';
import { Orderdetails } from '../interfaceclasses/orderdetails';
import { Confirmmovies } from '../interfaceclasses/confirmmovies';
import { OrderCart } from '../interfaceclasses/order-cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders_address!: Orderdetails
  order_invoice!: Confirmmovies
  private order_cart:OrderCart[]=[]

  constructor() { }
  
  rec_ordert_cart(invoice: Confirmmovies, address: Orderdetails) {
    const ordercart = { ...invoice, ...address } ;
    this.order_cart.push(ordercart);
  }
  order_cart_data() {
    return this.order_cart
  }

}
