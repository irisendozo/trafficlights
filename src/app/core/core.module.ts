import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrafficControllerService } from './traffic-controller.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TrafficControllerService],
})
export class CoreModule { }
