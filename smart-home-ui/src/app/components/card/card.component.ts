import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CARD_LAYOUT, ITEM_TYPE, Toggler } from '../../models/common-models';
import { Card } from '../../models/response-models';
import { IconMapperService } from '../../services/icon-mapper.service';
import { DeviceComponent } from '../device/device.component';
import { SensorComponent } from '../sensor/sensor.component';
import { ToggleComponent } from '../toggler/toggler.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ToggleComponent, DeviceComponent, SensorComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() cardData!: Card;

  iconMapper = inject(IconMapperService);

  toggler = signal<Toggler | null>(null);

  layout: CARD_LAYOUT = CARD_LAYOUT.VERTICAL;

  ngOnInit() {
    const devices = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE);
    const state = devices.some((item) => item.state);
    this.toggler.set({ state });

    this.layout = this.cardData.layout as CARD_LAYOUT;
  }

  hasToggler(): boolean {
    return this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE).length > 1;
  }

  onToggleChange() {
    this.toggler.update((current) => {
      if (!current) return current;
      return { ...current, state: !current.state };
    });
  }
}
