import { Confirmmovies } from './../interfaceclasses/confirmmovies';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Orderdetails } from '../interfaceclasses/orderdetails';
import { OrderCart } from '../interfaceclasses/order-cart';
import { OrderbadgeService } from '../service/orderbadge.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order_data: OrderCart[] = []
  invoice_data!: OrderCart
  invoicetoggle = false
  no_of_orders!: number
  is_order_data = false
  constructor(private service: OrderService, private orderbadge: OrderbadgeService) { }
  ngOnInit(): void {
    this.rec_order_data()
    if (this.order_data.length > 0) {
      this.orderbadge.order_badge_data(true)
    }


  }

  rec_order_data() {
    // const ordercartdata = this.service.order_cart_data()
    // if(ordercartdata){
    //   this.order_data.push(ordercartdata)

    // }
    this.order_data = this.service.order_cart_data()


  }

  indexing_invoice_data(i: number) {
    this.invoice_data = this.order_data[i]
  }
  invoice_toggle() {
    this.invoicetoggle = !this.invoicetoggle
  }
  close_invoice(bool: boolean) {
    this.invoicetoggle = bool
  }

  // orderBadge no

}
