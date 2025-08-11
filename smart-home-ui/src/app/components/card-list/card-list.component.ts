import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../models/response-models';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  @Input() cardsData: Card[] = [];
}
