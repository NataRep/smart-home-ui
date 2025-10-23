import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, TemplateRef } from '@angular/core';
import { APP_TITLE } from '../../models/constants';
import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';
import { SidebarFooterComponent } from './sidebar-footer/sidebar-footer.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarHeaderComponent, SidebarMenuComponent, SidebarFooterComponent, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() addDashboardTemplate!: TemplateRef<unknown>;

  private deviceService = inject(DeviceService);
  authService = inject(AuthService);

  isMobile = this.deviceService.isMobile();
  isOpen: boolean = !this.isMobile;
  title: string = APP_TITLE;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
