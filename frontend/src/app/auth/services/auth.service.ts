import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, EMPTY } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(userData: {
    fullName: string;
    idNumber: string;
    accountNumber: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          throw error;
        })
      );
  }

  login(accountNumber: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { accountNumber, password })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  private refreshToken() {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.refreshToken) {
      return this.http.post<any>(`${environment.apiUrl}/auth/refresh-token`, {
        refreshToken: currentUser.refreshToken
      }).pipe(
        tap(tokens => {
          currentUser.token = tokens.accessToken;
          currentUser.refreshToken = tokens.refreshToken;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
          this.startTokenTimer();
        })
      );
    }
    return EMPTY;
  }

  private startTokenTimer() {
    const jwtToken = JSON.parse(atob(this.currentUserValue.token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000); // Refresh 1 minute before expiry
    this.tokenExpirationTimer = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  logout() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
} 