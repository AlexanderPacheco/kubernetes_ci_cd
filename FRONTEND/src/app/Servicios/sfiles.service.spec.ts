import { TestBed } from '@angular/core/testing';

import { SfilesService } from './sfiles.service';

describe('SfilesService', () => {
  let service: SfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
