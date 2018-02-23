import { TestBed, inject } from '@angular/core/testing';

import { AtisService } from './atis.service';

describe('AtisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtisService]
    });
  });

  it('should be created', inject([AtisService], (service: AtisService) => {
    expect(service).toBeTruthy();
  }));
});
