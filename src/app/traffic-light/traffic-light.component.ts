import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.less']
})
export class TrafficLightComponent implements OnInit {
  @Input() name: string;
  @Input() state: string;

  ngOnInit() { }
}
