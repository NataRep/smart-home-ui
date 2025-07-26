import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconMapper',
  standalone: true,
})
export class IconMapperPipe implements PipeTransform {
  transform(value: string): string {
    const iconMappings: { [customIcon: string]: string } = {
      lightbulb: 'fa-lightbulb',
      thermostat: 'fa-temperature-half',
      water_drop: 'fa-droplet',
      cloud: 'fa-smog',
      co2: 'fa-smog',
      motion_photos_on: 'fa-person-running',
      power: 'fa-power-off',
    };

    return iconMappings[value.toLowerCase()] || 'fa-question-circle';
  }
}
