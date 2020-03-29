import { TestBed } from '@angular/core/testing';

import { DeviceUtilService } from './device-util.service';

describe('DeviceUtilService', () => {
  let service: DeviceUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
