import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../auth/authresponse';
import { AuthRequest } from './authRequest';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  private readonly USERNAME_ITEM_FOR_SESSION: string = 'auth_user';
  private apiServerUrl = environment.apiBaseUrl;
  private readonly LOGIN_PATH: string = '/users/userlogin';



  constructor(private http: HttpClient) { }

  public authenticate(form: FormGroup): Observable<AuthResponse> {
    const request: AuthRequest = this.toAuthRequest(form);
    return this.http.post<AuthResponse>(`${this.apiServerUrl}${this.LOGIN_PATH}`,
      request, httpOptions);
  }

  private toAuthRequest(form: FormGroup): AuthRequest {
    return {
      username: form.get('user')?.value,
      password: form.get('password')?.value,
    };
  }

  public setSessionItem(user: AuthResponse): void {
    window.sessionStorage.removeItem(this.USERNAME_ITEM_FOR_SESSION);
    window.sessionStorage.setItem(this.USERNAME_ITEM_FOR_SESSION, JSON.stringify(user));
  }

  public logout(): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/users/userlogout`,
      httpOptions);
  }

  public forbidenRes(): string {
    const request: AuthRequest = {
      username: 'testuser@testa.pl',
      password: 'testp@ssword'
    }

    this.http.post<AuthResponse>(`${this.apiServerUrl}/users/test`,
      request, httpOptions).subscribe({
        next: rest => {
          console.log(rest);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);
        }
      });
      return 'DATA FOR ONLY LOGGED USER: WORK IN PROGRESS'
  }


}

