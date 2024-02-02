import { TestBed } from '@angular/core/testing';

import { JvFileService } from './jv-file.service';

describe('JvFileService', () => {
  let service: JvFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JvFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
