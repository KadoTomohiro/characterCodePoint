import { TestBed } from '@angular/core/testing';

import { UnicodeService } from './unicode.service';

describe('UnicodeService', () => {
  let service: UnicodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnicodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all character info', () => {
      expect(service.getUnicodeInfo("渡".codePointAt(0)!)).toBeTruthy()
  });
});
