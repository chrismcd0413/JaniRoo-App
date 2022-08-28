import { TestBed } from '@angular/core/testing';

import { MoreDataService } from './more-data.service';

describe('MoreDataService', () => {
  let service: MoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
