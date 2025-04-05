import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, switchMap, throwError} from 'rxjs';
import {AuthStatusEnum} from '../enums/status-enum';
import {LoginResponseInterface} from '../interfaces/response/login-response-interface';
import {RegisterResponseInterface} from '../interfaces/response/register-response-interface';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {RoleEnum} from '../enums/role-enum';
import {LoginRequestInterface} from '../interfaces/request/login-request-interface';
import {RegisterRequestInterface} from '../interfaces/request/register-request-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _authStatus = signal<AuthStatusEnum>(AuthStatusEnum.checking);
  public authStatus = computed(() => this._authStatus());
  private router = inject(Router);
  public sessionExpired = signal<boolean>(false);
  private _userRole = signal<RoleEnum | null>(null);

  constructor() {
    this.initializeAuthStatus();
    this.startTokenCheck();
  }

  private initializeAuthStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this._authStatus.set(AuthStatusEnum.authenticated);
      this.loadUserRole(token);
    } else {
      this._authStatus.set(AuthStatusEnum.notAuthenticated);
    }
  }

  private loadUserRole(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role) {
        this._userRole.set(decoded.role as RoleEnum);
      }
    } catch (error) {
      this._userRole.set(null);
    }
  }

  private setAuthentication(token: string, roles: string[]): boolean {
    if (!token) return false;
    localStorage.setItem('token', token);
    this._authStatus.set(AuthStatusEnum.authenticated);

    if (roles.length > 0) {
      this._userRole.set(roles[0] as RoleEnum);
    }

    return true;
  }

  login(loginRequest: LoginRequestInterface): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<LoginResponseInterface>(url, loginRequest).pipe(
      map(({token, user}) => {
        this.setAuthentication(token, user.roles);
        return true;
      }),
      catchError(err => throwError(() => err.error.message || 'Error inesperado al iniciar sesión'))
    );
  }

  register(registerRequest: RegisterRequestInterface): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const loginRequest: LoginRequestInterface = {
      email: registerRequest.email,
      password: registerRequest.password
    };

    return this.http.post<RegisterResponseInterface>(url, registerRequest).pipe(
      switchMap(() => this.login(loginRequest)),
      catchError((error: HttpErrorResponse) => {
        console.log(registerRequest);
        console.log(loginRequest);
        const errorMessage = error.error?.message || 'Error inesperado al registrar';
        return throwError(() => errorMessage);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._authStatus.set(AuthStatusEnum.notAuthenticated);
    this.sessionExpired.set(false);
    this._userRole.set(null);
    this.router.navigateByUrl('/auth/login').then();
  }

  private getTokenExpiration(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp ? decoded.exp * 1000 : null;
    } catch (error) {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    const exp = this.getTokenExpiration();
    return exp ? Date.now() > exp : true;
  }

  private startTokenCheck() {
    setInterval(() => {
      const token = localStorage.getItem('token');
      if (token && this.isTokenExpired(token)) {
        this.logout();
        this.sessionExpired.set(true);
      }
    }, 60000);
  }

  isAdmin(): boolean {
    return this._userRole() === RoleEnum.admin;
  }

  isOwner(): boolean {
    return this._userRole() === RoleEnum.owner;
  }

  isRenter(): boolean {
    return this._userRole() === RoleEnum.renter;
  }
}
