import { TestBed } from '@angular/core/testing';

import { GetSettingService } from './get-settings.service';

describe('GetCriterionByIdService', () => {
  let service: GetSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
