import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCatalog(limit: string): Observable<Book[]> {
    const limitParam = new HttpParams().set('limit', limit);
    return this.http.get<Book[]>(`${this.apiServerUrl}/catalog`, {params: limitParam});
  }
}
