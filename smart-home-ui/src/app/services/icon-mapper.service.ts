import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IconMapperService {
  private iconMappings: { [customIcon: string]: string } = {
    lightbulb: 'fa-lightbulb',
    thermostat: 'fa-temperature-half',
    water_drop: 'fa-droplet',
    cloud: 'fa-smog',
    co2: 'fa-smog',
    motion_photos_on: 'fa-person-running',
    power: 'fa-power-off',
  };

  getIconClass(customIcon: string): string {
    return this.iconMappings[customIcon.toLowerCase()] || 'fa-question-circle';
  }
}
