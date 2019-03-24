import { TestBed } from '@angular/core/testing';

import { StyleServiceService } from './style-service.service';

describe('StyleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StyleServiceService = TestBed.get(StyleServiceService);
    expect(service).toBeTruthy();
  });
});
