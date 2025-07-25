import { Component, Input, OnInit, signal } from '@angular/core';
import { Card } from '../../models/response-models';
import { ToggleComponent } from '../toggler/toggler.component';

enum ITEM_TYPE {
  DEVICE = 'device',
  SENSOR = 'sensor',
}

enum CARD_LAYOUT {
  VERTICAL = 'verticalLayout',
  HORIZONTAL = 'horizontalLayout',
  SINGLE = 'singleDevice',
}

type Toggler = {
  state: boolean;
};

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() cardData!: Card;

  toggler = signal<Toggler | null>(null);

  layout: CARD_LAYOUT = CARD_LAYOUT.VERTICAL;

  ngOnInit() {
    console.log('cardData', this.cardData);

    if (this.hasToggler()) {
      const devices = this.cardData.items.filter((item) => item.type === ITEM_TYPE.DEVICE);
      const state = devices.some((item) => item.state);
      this.toggler.set({ state });
    }

    this.layout =
      this.cardData.layout === CARD_LAYOUT.VERTICAL ? CARD_LAYOUT.VERTICAL : CARD_LAYOUT.HORIZONTAL;
  }

  hasToggler(): boolean {
    return this.cardData.items.some((item) => item.type === ITEM_TYPE.DEVICE);
  }

  onToggleChange() {
    this.toggler.update((current) => {
      if (!current) return current;
      return { ...current, state: !current.state };
    });
  }
}
