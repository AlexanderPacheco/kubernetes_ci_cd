import { TestBed } from '@angular/core/testing';

import { GestorCarpetasService } from './gestor-carpetas.service';

describe('GestorCarpetasService', () => {
  let service: GestorCarpetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorCarpetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
