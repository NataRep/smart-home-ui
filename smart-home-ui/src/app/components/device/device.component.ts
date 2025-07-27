import { Component, effect, Input, OnInit, Signal, signal } from '@angular/core';
import { Toggler } from '../../models/common-models';
import { IconMapperPipe } from '../../pipes/icon-mapper.pipe';
import { BaseItemComponent } from '../base-item/base-item.component';
import { ToggleComponent } from '../toggler/toggler.component';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [ToggleComponent, IconMapperPipe],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent extends BaseItemComponent implements OnInit {
  @Input() parentState!: Signal<boolean>;

  toggler = signal<Toggler>({ state: false });

  isInitialized = false;

  constructor() {
    super();

    effect(
      () => {
        const currentState = this.parentState();

        if (this.isInitialized) {
          this.handleParentStateChange(currentState);
        } else {
          this.isInitialized = true;
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {
    if (this.itemData.state) {
      this.toggler.set({ state: this.itemData.state });
    }
  }

  onToggleChange() {
    this.toggler.update((current) => {
      if (!current) return current;
      return { ...current, state: !current.state };
    });
  }

  private handleParentStateChange(currentState: boolean): void {
    this.toggler.update((current) => {
      if (!current) return current;
      return { ...current, state: currentState };
    });
  }
}
