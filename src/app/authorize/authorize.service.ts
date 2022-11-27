import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './authresponse';
import { AuthRequest } from './authRequest';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  private readonly USERNAME_ITEM_FOR_SESSION: string = 'username';
  private apiServerUrl = environment.apiBaseUrl;
  private readonly LOGIN_PATH: string = '/users/userlogin';

  constructor(private http: HttpClient) { }

  authenticate(form: FormGroup): Observable<HttpResponse<AuthResponse>> {
    const request: AuthRequest = this.toAuthRequest(form);

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    })

    return this.http.post<AuthResponse>(`${this.apiServerUrl}${this.LOGIN_PATH}`,
      request,
      { observe: 'response', withCredentials: true, 'headers': headers })
  }

  private toAuthRequest(form: FormGroup): AuthRequest {
    return {
      username: form.get('user')?.value,
      password: form.get('password')?.value,
    };
  }

  public setSessionItem(username: string): void {
    sessionStorage.setItem(this.USERNAME_ITEM_FOR_SESSION, username)
  }

  public isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem(this.USERNAME_ITEM_FOR_SESSION);
    return user != null;
  }

  public logout(): void {
    sessionStorage.removeItem(this.USERNAME_ITEM_FOR_SESSION);
    console.log('logged out');
  }
}

