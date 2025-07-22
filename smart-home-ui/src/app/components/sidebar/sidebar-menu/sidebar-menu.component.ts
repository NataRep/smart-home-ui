import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActiveLinkDirective } from '../../../directives/active-link.directive';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterModule, NgClass, ActiveLinkDirective],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent {
  @Input() isSidebarOpen: boolean = false;

  linkList = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'fa-tachometer-alt',
    },
    {
      name: 'About',
      path: '/about',
      icon: 'fa-info-circle',
    },
  ];
}
