import { TestBed } from '@angular/core/testing';

import { OrderbadgeService } from './orderbadge.service';

describe('OrderbadgeService', () => {
  let service: OrderbadgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderbadgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
