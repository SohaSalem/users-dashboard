import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export const AUTH_SERVICE = new InjectionToken<string>('AUTH_SERVICE');

export interface AuthService {
  login(email: string, password: string): Observable<{ token: string }>;
}
