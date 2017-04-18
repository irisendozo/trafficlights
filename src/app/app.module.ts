import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';

import { CYCLE, TrafficControllerService } from './core/traffic-controller.service';
import { TrafficLoggerService } from './core/traffic-logger.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TrafficLightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    TrafficControllerService,
    TrafficLoggerService,
    { provide: CYCLE, useValue: environment.cycle },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
