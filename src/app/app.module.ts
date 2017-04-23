import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'environments/environment';

import { AppComponent } from './app.component';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';

import { CYCLE, TrafficControllerService } from './core/traffic-intersection-controller.service';
import { TrafficLoggerService } from './core/traffic-logger.service';

@NgModule({
  declarations: [
    AppComponent,
    TrafficLightComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    TrafficControllerService,
    TrafficLoggerService,
    { provide: CYCLE, useValue: environment.cycle },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
