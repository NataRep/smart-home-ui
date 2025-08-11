import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MENU_LINKS } from '../../../models/main.constant';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent {
  @Input() isSidebarOpen: boolean = false;

  linkList = MENU_LINKS;
}
