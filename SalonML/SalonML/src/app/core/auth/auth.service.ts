import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey: string = "token";

    public isLoggedIn: boolean = false;

    constructor(private http: HttpClient) {
        this.isLoggedIn = localStorage.getItem(this.tokenKey) !== null;
    }

    login(item: LoginRequest): Observable<LoginResult> {
        var url = environment.baseUrl + "api/Account/Login";

        return this.http.post<LoginResult>(url, item)
            .pipe(tap(loginResult => {
                if (loginResult.success && loginResult.token) {
                    localStorage.setItem(this.tokenKey, loginResult.token);
                    this.isLoggedIn = true;
                    console.log(loginResult.token); //todo delete
                }
            }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn = false; // probably don't need this (todo)
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  token?: string;
}
