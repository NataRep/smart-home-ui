import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APP_TITLE } from '../../models/main.constant';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sidebar--open]': 'isOpen',
  },
})
export class SidebarComponent {
  private deviceService = inject(DeviceService);
  isMobile = this.deviceService.isMobile();
  isOpen: boolean = !this.isMobile;

  title: string = APP_TITLE;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
