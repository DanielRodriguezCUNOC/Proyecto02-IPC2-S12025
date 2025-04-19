import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clienteActivoGuard } from './cliente-activo.guard';

describe('clienteActivoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clienteActivoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
