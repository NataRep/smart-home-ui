import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { IconMapperPipe } from '../../pipes/icon-mapper.pipe';
import { SensorValuePipe } from '../../pipes/sensor-value.pipe';
import { BaseItemComponent } from '../base-item/base-item.component';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [IconMapperPipe, SensorValuePipe, NgClass],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.scss',
})
export class SensorComponent extends BaseItemComponent {}
