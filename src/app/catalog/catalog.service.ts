import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { ConnectableObservable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from './book';
import * as e from 'express';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiServerUrl = environment.apiBaseUrl;
  private apiCover = environment.apiCover;

  constructor(private http: HttpClient) { }

  public getCatalog(limit: string): Observable<Book[]> {
    const limitParam = new HttpParams().set('limit', limit);
    return this.http.get<Book[]>(`${this.apiServerUrl}/catalog`, { params: limitParam })
  }
}
