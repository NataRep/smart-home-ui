import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type Toggler = {
  state: boolean;
};

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggler.component.html',
  styleUrl: './toggler.component.scss',
})
export class ToggleComponent {
  @Input() toggler!: Toggler;
  @Output() toggleChange = new EventEmitter<void>();

  onToggle() {
    this.toggleChange.emit();
  }
}
