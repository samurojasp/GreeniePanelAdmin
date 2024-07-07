import { TestBed } from '@angular/core/testing';

import { GetNotPaginatedDepartmentsService } from './get-not-paginated-departments.service';

describe('GetNotPaginatedDepartmentsService', () => {
  let service: GetNotPaginatedDepartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNotPaginatedDepartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
