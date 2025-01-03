import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbadgeComponent } from './orderbadge.component';

describe('OrderbadgeComponent', () => {
  let component: OrderbadgeComponent;
  let fixture: ComponentFixture<OrderbadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderbadgeComponent]
    });
    fixture = TestBed.createComponent(OrderbadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
