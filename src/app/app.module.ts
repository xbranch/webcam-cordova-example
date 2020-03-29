import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import * as Hammer from 'hammerjs';

import { AppComponent } from './app.component';

export class AppHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: Hammer.DIRECTION_HORIZONTAL}
  };
}

@NgModule({
  imports: [
    BrowserModule,
    HammerModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HAMMER_GESTURE_CONFIG, useClass: AppHammerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
