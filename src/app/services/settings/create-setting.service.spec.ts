import { TestBed } from '@angular/core/testing';

import { CreateSettingService } from './create-settings.service';

describe('CreateDepartmentService', () => {
  let service: CreateSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
