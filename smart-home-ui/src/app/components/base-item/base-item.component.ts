import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Device, Sensor } from '../../models/api.model';

@Component({
  selector: 'app-base-item',
  standalone: true,
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseItemComponent {
  @Input() itemData!: Device | Sensor;
  @Input() layoutType!: string;

  logItemInfo() {
    console.log(`itemData`, this.itemData);
    console.log(`layoutType`, this.layoutType);
  }
}
