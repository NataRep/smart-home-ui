import { Component, Input } from '@angular/core';
import { Card } from '../../models/response-models';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input() cardsData: Card[] = [];
}
