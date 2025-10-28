import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, forkJoin, tap } from 'rxjs';
import { Card, Device } from '../../models/api.model';
import { CARD_LAYOUT, ITEM_TYPE, Toggler } from '../../models/enums';
import { IconMapperPipe } from '../../pipes/icon-mapper.pipe';
import { DashboardService } from '../../services/dashboard.service';
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

  private dashboardService = inject(DashboardService);
  private destroyRef = inject(DestroyRef);

  isLoading = signal(false);
  layout: string = CARD_LAYOUT.VERTICAL;
  isToggle: boolean = false;
  toggler = signal<Toggler | null>(null);
  deviceSignals: WritableSignal<boolean>[] = [];

  ngOnInit() {
    const devices = this.cardData.items.filter(
      (item): item is Device => item.type === ITEM_TYPE.DEVICE,
    );
    const hasAnyOn = devices.some((item) => item.state);
    this.toggler.set({ state: hasAnyOn });
    this.deviceSignals = devices.map((item) => signal(Boolean(item.state)));
    this.layout = this.cardData.layout;
  }

  ngAfterContentInit() {
    this.isToggle = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE).length > 1;
  }

  onToggleChange() {
    const newState = !this.toggler()!.state;
    const deviceRequests = this.cardData.items
      .filter((item): item is Device => item.type === ITEM_TYPE.DEVICE)
      .map((item) => this.dashboardService.changeStateDeviceById(item.id, newState));
    this.isLoading.set(true);
    forkJoin(deviceRequests)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((responses) => {
        for (const [i, resp] of responses.entries()) this.deviceSignals[i].set(resp.state);
        this.toggler.set({ state: newState });
      });
  }

  onDeviceToggled(index: number, newState: boolean) {
    const id = this.cardData.items[index].id;
    this.isLoading.set(true);
    this.dashboardService
      .changeStateDeviceById(id, newState)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((response) => {
          this.deviceSignals[index].set(response.state);
          this.syncParentToggle();
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe();
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
