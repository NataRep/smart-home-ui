import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { ITEM_TYPE, Toggler } from '../../models/enums';
import { IconMapperPipe } from '../../pipes/icon-mapper.pipe';
import { BaseItemComponent } from '../base-item/base-item.component';
import { ToggleComponent } from '../toggler/toggler.component';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [ToggleComponent, IconMapperPipe, NgClass],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceComponent extends BaseItemComponent implements OnInit {
  @Input() parentState!: Signal<boolean>;
  @Output() deviceToggled = new EventEmitter<boolean>();

  toggler = signal<Toggler>({ state: false });

  private isInitialized = false;

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
    if (this.itemData.type == ITEM_TYPE.DEVICE) {
      this.toggler.set({ state: this.itemData.state });
    }
  }

  onToggleChange() {
    this.toggler.update((current) => {
      const newState = !current.state;
      this.deviceToggled.emit(newState);
      return { ...current, state: newState };
    });
  }

  private handleParentStateChange(currentState: boolean): void {
    this.toggler.update((current) => ({ ...current, state: currentState }));
  }
}