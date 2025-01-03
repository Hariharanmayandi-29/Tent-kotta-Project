import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Confirmmovies } from '../interfaceclasses/confirmmovies';
import { NgControl, NgForm } from '@angular/forms';
import { Orderdetails } from '../interfaceclasses/orderdetails';
import { OrderService } from '../service/order.service';
import { OrderbadgeService } from '../service/orderbadge.service';

@Component({
  selector: 'app-confirmorder',
  templateUrl: './confirmorder.component.html',
  styleUrls: ['./confirmorder.component.css']
})
export class ConfirmorderComponent {
  @Input() movies_from_purchase!: Confirmmovies
  @Output() purchaseconfirm: any = new EventEmitter()
  order_address!: Orderdetails
  purchase_conf: boolean = false
  orderplaced:boolean=false
  no_orde:number=0
  constructor(private service: OrderService,private badgeservice:OrderbadgeService) {

  }
  address_form(orderform: NgForm) {
    this.place_order(orderform)

    this.reset_form(orderform)


  }

  reset_form(orderform: NgForm) {
    orderform.resetForm()
  }
   // place order
  orderid_gen(){
    const today=Date.now()
    const orderno=Math.floor(Math.random()*100000)
    return `ORD-${today}-${orderno}`
  }
 
  place_order(orderform: NgForm) {
    const formValues = orderform.value;

    // Map form values to `order_address` object
    const date = new Date();
    const delivery_date = new Date();
    // orderid generator
   
    delivery_date.setDate(date.getDate() + 7);
    this.order_address = {
      name: formValues.name,
      mobile: formValues.mobile,
      country: formValues.country,
      address: {
        line1: orderform.value.address.line1,
        line2: formValues.address.line2,
        city: formValues.address.city,
        zipcode: formValues.address.zipcode,
      },
      date: String(date),
      accept_info: formValues.accept_info,
      deliver_date: String(delivery_date),
      orderid:this.orderid_gen()
    };
    this.send_orders_data()
    this.order_succesfull()
    this.no_of_order_fn()

    


  }
  send_orders_data() {
    this.service.rec_ordert_cart(this.movies_from_purchase, this.order_address)


  }
  order_succesfull(){
    this.orderplaced=!this.orderplaced
  }
  no_of_order_fn(){
    
    this.badgeservice.set_no_of_order(); 
  }





}
