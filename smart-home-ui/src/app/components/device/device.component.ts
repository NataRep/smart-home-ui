import { Component, OnInit, signal } from '@angular/core';
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
  toggler = signal<Toggler>({ state: false });

  ngOnInit() {
    if (this.itemData.state) {
      this.toggler.set({ state: this.itemData.state });
    }

    this.logItemInfo();
  }

  onToggleChange() {
    this.toggler.update((current) => {
      if (!current) return current;
      return { ...current, state: !current.state };
    });
  }
}
