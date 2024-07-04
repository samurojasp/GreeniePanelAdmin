import { TestBed } from '@angular/core/testing';

import { GetDocumentByCriterionIdService } from './get-document-by-criterionId.service';

describe('GetDocumentByCriterionIdService', () => {
  let service: GetDocumentByCriterionIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDocumentByCriterionIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
