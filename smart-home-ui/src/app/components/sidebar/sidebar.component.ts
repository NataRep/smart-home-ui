import { Component, inject, Input } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { SidebarFooterComponent } from './sidebar-footer/sidebar-footer.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarHeaderComponent, SidebarMenuComponent, SidebarFooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    '[class.sidebar--open]': 'isOpen',
  },
})
export class SidebarComponent {
  @Input() title: string = '';

  private deviceService = inject(DeviceService);
  isMobile = this.deviceService.isMobile();
  isOpen: boolean = !this.isMobile;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
