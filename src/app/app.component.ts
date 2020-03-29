import { Component, OnInit } from '@angular/core';

import { CameraService } from './core/devices/camera.service';
import { DeviceUtilService } from './core/util/device-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private deviceUtil: DeviceUtilService, private camera: CameraService) {
  }

  ngOnInit(): void {
    this.deviceUtil.getDevice().subscribe(device => {
      console.log(device);
    });
  }

  snapshot(): void {
    this.camera.capture().subscribe(image => {
      console.log(`data:image/jpeg;base64,${image}`);
    }, console.error);
  }
}
