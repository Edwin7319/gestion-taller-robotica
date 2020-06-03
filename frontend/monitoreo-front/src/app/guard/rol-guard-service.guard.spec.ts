import { TestBed, async, inject } from '@angular/core/testing';

import { RolGuardServiceGuard } from './rol-guard-service.guard';

describe('RolGuardServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolGuardServiceGuard]
    });
  });

  it('should ...', inject([RolGuardServiceGuard], (guard: RolGuardServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
