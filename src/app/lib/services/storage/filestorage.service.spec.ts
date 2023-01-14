import { TestBed } from '@angular/core/testing';

import { FilestorageService } from './filestorage.service';

describe('FilestorageService', () => {
  let service: FilestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
