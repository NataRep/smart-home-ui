import { Component } from '@angular/core';
import { TabSwitcherComponent } from '../tab-switcher/tab-switcher.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabSwitcherComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
