import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiServerUrl = environment.apiBaseUrl;
  private ADMIN_PATH: string = '/admin';

  constructor(private http: HttpClient) { }

  public getAdminHealthCheck(): Observable<any> {
    return this.http.get(this.apiServerUrl + this.ADMIN_PATH + '/check',{responseType: 'text'})

  }

}
