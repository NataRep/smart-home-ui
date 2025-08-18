import { AfterContentInit, ChangeDetectionStrategy, Component, computed, Input, OnInit, signal } from '@angular/core';
import { Card, CardItem } from '../../models/api.model';
import { CARD_LAYOUT, ITEM_TYPE, Toggler } from '../../models/enums';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, AfterContentInit {
  @Input() cardData!: Card;

  toggler = signal<Toggler | null>(null);
  togglerState = computed(this.getTogglerState.bind(this));
  layout: string = CARD_LAYOUT.VERTICAL;
  devicesTogglerList: Toggler[] | [] = [];
  isToggle: boolean = false;

  ngOnInit() {
    const devices = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE);
    const state = devices.some((item) => item.state);
    this.toggler.set({ state });

    this.initDevicesTogglerList(devices);
    this.layout = this.cardData.layout;
  }

  ngAfterContentInit() {
    this.isToggle = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE).length > 1;
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
