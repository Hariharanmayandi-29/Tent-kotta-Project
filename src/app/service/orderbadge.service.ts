import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderbadgeService {
  no_of_orders: number = 0
  subject = new BehaviorSubject(false)
  obs = this.subject.asObservable()
  is_order_badge_on = false
  constructor() { }
  set_no_of_order() {
    this.no_of_orders += 1
  }
  increment_order() {
    return this.no_of_orders
  }

  // for bage initial statge
  order_badge_data(bool: boolean) {
    this.is_order_badge_on = bool
    this.subject.next(bool)
  }

}
