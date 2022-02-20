import { TestBed } from '@angular/core/testing';

import { FilesiuService } from './filesiu.service';

describe('FilesiuService', () => {
  let service: FilesiuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesiuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
