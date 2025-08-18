import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { LoginResponse, User } from '../models/api.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenStorageService);

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _currentUser = new BehaviorSubject<User | null>(null);

  isAuthenticated$ = this._isAuthenticated.asObservable();
  currentUser$ = this._currentUser.asObservable();

  constructor() {
    // Проверяем токен при инициализации сервиса
    if (this.tokenService.getToken()) {
      this.loadProfile().subscribe();
    }
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<LoginResponse>('user/login', { userName: username, password }).pipe(
      tap(response => {
        if (!response.token) throw new Error('Ошибка получения токена');
        this.tokenService.saveToken(response.token);
      }),
      switchMap(() => this.loadProfile()),
      catchError(error => throwError(() => error))
    );
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>('user/profile').pipe(
      tap(user => {
        this._isAuthenticated.next(true);
        this._currentUser.next(user);
      }),
      catchError(error => {
        this._isAuthenticated.next(false);
        this._currentUser.next(null);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this._isAuthenticated.next(false);
    this._currentUser.next(null);
    this.tokenService.clearToken();
  }
}