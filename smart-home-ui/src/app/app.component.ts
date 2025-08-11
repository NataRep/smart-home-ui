import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService)
  private tokenStorageService = inject(TokenStorageService)

  ngOnInit() {
    this.authService.login('Warner', 'ea').subscribe({
      next: user => {
        const token = this.tokenStorageService.getToken();
        console.log('Токен после логина:', token);
        console.log('Данные пользователя:', user);
      },
      error: err => {
        console.error('Ошибка при логине:', err);
      }
    });
  }
}
