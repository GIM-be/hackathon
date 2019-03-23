import { TestBed } from '@angular/core/testing';

import { ResponsivenessServiceService } from './responsiveness-service.service';

describe('ResponsivenessServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponsivenessServiceService = TestBed.get(ResponsivenessServiceService);
    expect(service).toBeTruthy();
  });
});
