import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Device {
  cordova: string;
  model: string;
  platform: string;
  uuid: string;
  version: string;
  manufacturer: string;
  isVirtual: boolean;
  serial: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceUtilService {

  private static get device(): Device | null {
    return (window as any).device || null;
  }

  constructor() {
  }

  getDevice(): Observable<Device | null> {
    return of(DeviceUtilService.device);
  }
}
