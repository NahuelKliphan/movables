import { TestBed } from '@angular/core/testing';

import { RegistroPrecioService } from './registro-precio.service';

describe('RegistroPrecioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroPrecioService = TestBed.get(RegistroPrecioService);
    expect(service).toBeTruthy();
  });
});
