import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sidebar-footer.component.html',
  styleUrl: './sidebar-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFooterComponent {
  @Input() isSidebarOpen: boolean = false;

  authService = inject(AuthService);
  router = inject(Router)

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
