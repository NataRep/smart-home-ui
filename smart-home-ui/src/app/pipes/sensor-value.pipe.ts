import { Pipe, PipeTransform } from '@angular/core';
import { CardItem } from '../models/response-models';

@Pipe({
  name: 'sensorValue',
  standalone: true,
})
export class SensorValuePipe implements PipeTransform {
  transform(data: CardItem): string {
    const separator = data.value?.unit == '%' ? '' : ' ';
    return `${data.value?.amount}${separator}${data.value?.unit}`;
  }
}
