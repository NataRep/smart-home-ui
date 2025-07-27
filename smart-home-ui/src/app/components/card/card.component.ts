import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { CARD_LAYOUT, ITEM_TYPE, Toggler } from '../../models/common-models';
import { Card, CardItem } from '../../models/response-models';
import { IconMapperPipe } from '../../pipes/icon-mapper.pipe';
import { DeviceComponent } from '../device/device.component';
import { SensorComponent } from '../sensor/sensor.component';
import { ToggleComponent } from '../toggler/toggler.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ToggleComponent, DeviceComponent, SensorComponent, IconMapperPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() cardData!: Card;

  toggler = signal<Toggler | null>(null);

  togglerState = computed(this.getTogglerState.bind(this));

  layout: CARD_LAYOUT = CARD_LAYOUT.VERTICAL;

  devicesTogglerList: Toggler[] | [] = [];

  ngOnInit() {
    const devices = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE);
    const state = devices.some((item) => item.state);
    this.toggler.set({ state });

    this.initDevicesTogglerList(devices);

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

  onDeviceToggled(index: number, newState: boolean) {
    this.devicesTogglerList[index] = { state: newState };

    if (this.isAllDeviceOff()) {
      this.toggler.update((current) => {
        if (!current) return current;
        return { ...current, state: false };
      });
    }

    if (this.isAllDeviceOn()) {
      this.toggler.update((current) => {
        if (!current) return current;
        return { ...current, state: true };
      });
    }
  }

  initDevicesTogglerList(devices: CardItem[]) {
    this.devicesTogglerList = devices
      .filter((item) => item.state !== undefined)
      .map((item) => ({ state: Boolean(item.state) }));
  }

  isAllDeviceOff(): boolean {
    return this.devicesTogglerList.every((toggler) => !toggler.state);
  }

  isAllDeviceOn(): boolean {
    return this.devicesTogglerList.every((toggler) => toggler.state);
  }

  private getTogglerState(): boolean {
    return this.toggler()?.state ?? false;
  }
}
