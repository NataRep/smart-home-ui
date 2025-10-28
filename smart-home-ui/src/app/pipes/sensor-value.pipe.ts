import { Pipe, PipeTransform } from '@angular/core';
import { Sensor } from '../models/api.model';

@Pipe({
  name: 'sensorValue',
  standalone: true,
})
export class SensorValuePipe implements PipeTransform {
  transform(data: Sensor): string {
    const separator = data.value?.unit == '%' ? '' : ' ';
    return `${data.value?.amount}${separator}${data.value?.unit}`;
  }
}
