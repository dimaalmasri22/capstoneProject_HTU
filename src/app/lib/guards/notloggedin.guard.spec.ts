import { TestBed } from '@angular/core/testing';

import { NotloggedinGuard } from './notloggedin.guard';

describe('NotloggedinGuard', () => {
  let guard: NotloggedinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotloggedinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
