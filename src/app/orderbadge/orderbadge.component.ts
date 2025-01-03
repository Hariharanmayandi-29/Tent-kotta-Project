import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderbadgeService } from '../service/orderbadge.service';

@Component({
  selector: 'app-orderbadge',
  templateUrl: './orderbadge.component.html',
  styleUrls: ['./orderbadge.component.css']
})
export class OrderbadgeComponent implements OnInit {
  no_of_order: number = 0;

  constructor(
    private service: OrderbadgeService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.no_of_order = this.service.increment_order();
  }

  ngDoCheck() {
    
    this.no_of_order = this.service.increment_order();
      
  }
}
