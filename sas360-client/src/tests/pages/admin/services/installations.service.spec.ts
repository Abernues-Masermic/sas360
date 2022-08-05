import { TestBed } from '@angular/core/testing';

import { InstallationsService } from '../../../../app/pages/admin/services/installations.service';

describe('InstallationsService', () => {
  let service: InstallationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
