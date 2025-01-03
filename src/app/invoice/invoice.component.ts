import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderCart } from '../interfaceclasses/order-cart';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{
@Input()invoice_data!:OrderCart
@Output()close_btn=new EventEmitter<boolean>()
ngOnInit(): void {
  
}
close_invoice(){
this.close_btn.emit(false)
}
}
