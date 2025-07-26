import { Component, Input } from '@angular/core';
import { CardItem } from '../../models/response-models';

@Component({
  selector: 'app-base-item',
  standalone: true,
  imports: [],
  template: '',
})
export class BaseItemComponent {
  @Input() itemData!: CardItem;
  @Input() layoutType!: string;

  logItemInfo() {
    console.log(`itemData`, this.itemData);
    console.log(`layoutType`, this.layoutType);
  }
}
