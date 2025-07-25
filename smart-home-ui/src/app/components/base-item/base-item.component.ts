import { Component, inject, Input } from '@angular/core';
import { CardItem } from '../../models/response-models';
import { IconMapperService } from '../../services/icon-mapper.service';

@Component({
  selector: 'app-base-item',
  standalone: true,
  imports: [],
  template: '',
})
export class BaseItemComponent {
  @Input() itemData!: CardItem;
  @Input() layoutType!: string;

  iconMapper = inject(IconMapperService);

  logItemInfo() {
    console.log(`itemData`, this.itemData);
    console.log(`layoutType`, this.layoutType);
  }
}
