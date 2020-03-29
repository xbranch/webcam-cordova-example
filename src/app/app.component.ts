import { Component, OnDestroy, OnInit } from '@angular/core';

import { CameraService } from './core/devices/camera.service';
import { DeviceUtilService } from './core/util/device-util.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private snapshots: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private snapshot: BehaviorSubject<number> = new BehaviorSubject(null);

  snapshots$: Observable<string[]> = this.snapshots.asObservable();
  snapshot$: Observable<number> = this.snapshot.asObservable();

  constructor(private deviceUtil: DeviceUtilService, private camera: CameraService) {
  }

  ngOnInit(): void {
    this.deviceUtil.getDevice().subscribe(device => {
      console.log(device);
    });
  }

  ngOnDestroy(): void {
    this.snapshots.complete();
    this.snapshot.complete();
  }

  capture(): void {
    this.camera.capture().subscribe(image => {
      this.snapshots.next(this.snapshots.getValue().concat([`data:image/jpeg;base64,${image}`]));
      this.snapshot.next(0);
    }, console.error);
  }

  next(): void {
    const numberOfSnapshots = this.snapshots.getValue().length;
    this.snapshot.next((this.snapshot.getValue() + 1) % numberOfSnapshots);
  }

  prev(): void {
    const numberOfSnapshots = this.snapshots.getValue().length;
    this.snapshot.next(((this.snapshot.getValue() - 1) + numberOfSnapshots) % numberOfSnapshots);
  }
}
