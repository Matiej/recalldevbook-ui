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
    const newbook: Book[] = [];
    this.http.get<Book[]>(`${this.apiServerUrl}/catalog`, { params: limitParam })
      .forEach(el => {
        el.forEach(book => {
          book.coverUrl = this.apiServerUrl + this.apiCover + '/' + book.bookCoverId;
          newbook.push(book);
        });
      }).catch((error: HttpErrorResponse) => {
        console.error('http catalog errir: ' + error.message)
      })

    return of(newbook);
  }
}
