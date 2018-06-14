import { TestBed, inject } from '@angular/core/testing';

import { OverlayManagerService } from './overlay-manager.service';

describe('OverlayManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverlayManagerService]
    });
  });

  it('should be created', inject([OverlayManagerService], (service: OverlayManagerService) => {
    expect(service).toBeTruthy();
  }));
});
