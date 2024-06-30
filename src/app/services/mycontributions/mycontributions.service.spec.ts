import { TestBed } from '@angular/core/testing';

import { MycontributionsService } from './mycontributions.service';

describe('MycontributionsService', () => {
  let service: MycontributionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycontributionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
