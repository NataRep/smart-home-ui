import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { Card } from '../../models/api.model';
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

  layout: string = CARD_LAYOUT.VERTICAL;
  isToggle: boolean = false;

  toggler = signal<Toggler | null>(null);

  deviceSignals: WritableSignal<boolean>[] = [];

  ngOnInit() {
    const devices = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE);
    const hasAnyOn = devices.some((item) => item.state);
    this.toggler.set({ state: hasAnyOn });
    this.deviceSignals = devices.map((item) => signal(Boolean(item.state)));
    this.layout = this.cardData.layout;
  }

  ngAfterContentInit() {
    this.isToggle = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE).length > 1;
  }

  onToggleChange() {
    this.toggler.update((current) => {
      if (!current) return current;
      const newState = !current.state;

      for (const sig of this.deviceSignals) sig.set(newState);

      return { ...current, state: newState };
    });
  }

  onDeviceToggled(index: number, newState: boolean) {
    this.deviceSignals[index].set(newState);
    this.syncParentToggle();
  }

  private syncParentToggle() {
    if (this.isAllDeviceOff()) {
      this.toggler.set({ state: false });
    } else if (this.isSomeDeviceOn()) {
      this.toggler.set({ state: true });
    }
  }

  private isAllDeviceOff(): boolean {
    return this.deviceSignals.every((sig) => sig() === false);
  }

  private isSomeDeviceOn(): boolean {
    return this.deviceSignals.some((sig) => sig() === true);
  }
}