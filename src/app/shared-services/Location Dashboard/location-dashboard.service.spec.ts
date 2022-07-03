import { TestBed } from '@angular/core/testing';

import { LocationDashboardService } from './location-dashboard.service';

describe('LocationDashboardService', () => {
  let service: LocationDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
