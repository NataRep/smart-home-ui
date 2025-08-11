import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { LoginResponse, User } from '../models/response-models';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private tokenService = inject(TokenStorageService)

  private _isAuthenticated = new BehaviorSubject<boolean>(false)
  private _currentUser = new BehaviorSubject<User | null>(null)

  isAuthenticated$ = this._isAuthenticated.asObservable();
  currentUser$ = this._currentUser.asObservable();

  constructor() { }

  login(username: string, password: string): Observable<User> {
    const data = { userName: username, password };
    const url = 'user/login'

    const observable = this.http.post<LoginResponse>(url, data).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.saveToken(response.token)
        } else {
          throw new Error('Ошибка получения токена')
        }
      }),
      switchMap(() => this.loadProfile()),
      catchError(error => {
        return throwError(() => new Error(`Ошибка авторизации: ${error}`));
      })

    );

    return observable;
  }

  loadProfile(): Observable<User> {
    const url = 'user/profile'
    const observable = this.http.get<User>(url).pipe(
      tap((userData) => {
        this._isAuthenticated.next(true);
        this._currentUser.next(userData)
      }),
      catchError(error => {
        this._isAuthenticated.next(false);
        this._currentUser.next(null)
        return throwError(() => new Error(`Ошибка получения данных пользователя: ${error}`));
      })
    )

    return observable;
  }

  logout() {
    this._isAuthenticated.next(false);
    this._currentUser.next(null)
    this.tokenService.clearToken()
  }

}
