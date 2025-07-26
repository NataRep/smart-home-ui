import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorValuePipe } from '../../pipes/sensor-value.pipe';
import { SensorComponent } from './sensor.component';

describe('SensorComponent', () => {
  let component: SensorComponent;
  let fixture: ComponentFixture<SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorComponent, SensorValuePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
