import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MockComponent } from './mocks/mock.component';
import { AppComponent } from './app.component';

import { Intersection } from './core/traffic-controller.model';
import { CYCLE, TrafficControllerService } from './core/traffic-controller.service';
import { TrafficLoggerService } from './core/traffic-logger.service';

describe('AppComponent', () => {
  let mockTrafficControllerService: TrafficControllerService;
  let mockTrafficLoggerService: TrafficLoggerService;

  beforeEach(async(() => {
    mockTrafficControllerService = jasmine.createSpyObj('TrafficController', ['scheduler', 'intersection']);
    mockTrafficLoggerService = jasmine.createSpyObj('TrafficLogger', ['log']);
    mockTrafficControllerService.intersection =
      new BehaviorSubject({ north: 'green', south: 'green', east: 'red', west: 'red' } as Intersection);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-traffic-light', inputs: ['state'] }),
      ],
      providers: [
        { provide: TrafficControllerService, useValue: mockTrafficControllerService },
        { provide: TrafficLoggerService, useValue: mockTrafficLoggerService },
      ]
    }).compileComponents();

    mockTrafficControllerService = TestBed.get(TrafficControllerService);
    mockTrafficLoggerService = TestBed.get(TrafficLoggerService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should trigger scheduler on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.debugElement.componentInstance.ngOnInit();
    expect(mockTrafficControllerService.scheduler).toHaveBeenCalled();
  });

  it('should trigger logger when new intersection value is available', () => {
    const nextIntersection = { north: 'green', south: 'green', east: 'red', west: 'red' } as Intersection;
    const fixture = TestBed.createComponent(AppComponent);
    fixture.debugElement.componentInstance.ngOnInit();
    mockTrafficControllerService.intersection.next(nextIntersection);
    expect(mockTrafficLoggerService.log).toHaveBeenCalledWith(nextIntersection);
  });

  it('should pass on the value from the subject to intersection property', () => {
    const nextIntersection = { north: 'green', south: 'green', east: 'red', west: 'red' } as Intersection;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.debugElement.componentInstance.ngOnInit();
    mockTrafficControllerService.intersection.next(nextIntersection);
    expect(app.intersection).toBe(nextIntersection);
  });
});
