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
      flash_on: 'fa-bolt',
      access_time: 'fa-clock',
      tv: 'fa-tv',
      kitchen: 'fa-kitchen-set',
      heat_pump: 'fa-fire',
      door_front: 'fa-door-closed',
      videocam: 'fa-video',
      notifications_active: 'fa-bell',
      home: 'fa-home',
      bolt: 'fa-bolt',
      device_thermostat: 'fa-temperature-half',
      shield: 'fa-shield-alt'
    };

    return iconMappings[value.toLowerCase()] || 'fa-question-circle';
  }
}
