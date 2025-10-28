import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Card, Device, Tab } from '../../models/api.model';
import { CARD_LAYOUT, ITEM_TYPE, Toggler } from '../../models/enums';
import { IconMapperPipe } from '../../pipes/icon-mapper.pipe';
import * as TabsActions from '../../store/tabs/tabs.actions';
import { selectTabsLoading, selectTabsState } from '../../store/tabs/tabs.selectors';
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

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  isLoading = signal(false);
  layout: string = CARD_LAYOUT.VERTICAL;
  isToggle: boolean = false;
  toggler = signal<Toggler | null>(null);
  deviceSignals: WritableSignal<boolean>[] = [];

  // Селекторы для отслеживания состояния
  private tabsState$ = this.store.select(selectTabsState);
  private loadingState$ = this.store.select(selectTabsLoading);

  ngOnInit() {
    this.initializeComponentState();
    this.setupStateSubscriptions();
  }

  ngAfterContentInit() {
    this.isToggle = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE).length > 1;
  }

  private initializeComponentState() {
    const devices = this.cardData.items.filter(
      (item): item is Device => item.type === ITEM_TYPE.DEVICE,
    );
    const hasAnyOn = devices.some((item) => item.state);
    this.toggler.set({ state: hasAnyOn });
    this.deviceSignals = devices.map((item) => signal(Boolean(item.state)));
    this.layout = this.cardData.layout;
  }

  private setupStateSubscriptions() {
    // Отслеживаем обновления состояния устройств
    this.tabsState$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(state => {
      this.updateLocalDeviceStates(state.tabs);
    });

    // Отслеживаем состояние загрузки
    this.loadingState$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(loading => {
      this.isLoading.set(loading);
    });
  }

  private updateLocalDeviceStates(tabs: Tab[]) {
    // Находим актуальные состояния устройств из store
    const allDevices = tabs.flatMap(tab =>
      tab.cards.flatMap(card =>
        card.items.filter((item): item is Device => item.type === ITEM_TYPE.DEVICE)
      )
    );

    const deviceMap = new Map(allDevices.map(device => [device.id, device.state]));

    for (const [index, item] of this.cardData.items.entries()) {
      if (item.type === ITEM_TYPE.DEVICE) {
        const currentState = this.deviceSignals[index]();
        const newState = Boolean(deviceMap.get(item.id));

        if (currentState !== newState) {
          this.deviceSignals[index].set(newState);
        }
      }
    }

    this.syncParentToggle();
  }

  onToggleChange() {
    const newState = !this.toggler()!.state;
    const devices = this.cardData.items
      .filter((item): item is Device => item.type === ITEM_TYPE.DEVICE);

    for (const device of devices) {
      this.store.dispatch(TabsActions.toggleDeviceState({
        id: device.id,
        state: newState
      }));
    }
  }

  onDeviceToggled(index: number, newState: boolean) {
    const device = this.cardData.items[index];
    if (device.type === ITEM_TYPE.DEVICE) {
      this.store.dispatch(TabsActions.toggleDeviceState({
        id: device.id,
        state: newState
      }));
    }
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