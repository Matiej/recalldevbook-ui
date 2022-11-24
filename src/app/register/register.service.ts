import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiServerUrl = environment.apiBaseUrl;
  private readonly REGISTER_FULL: string = '/users/registerfull';

  constructor(private http: HttpClient) { }

  public registerUser(form: FormGroup): Observable<any> {
    const register: Register = this.toRegister(form);
    console.log(register);
    return this.http.post<Register>(`${this.apiServerUrl}${this.REGISTER_FULL}`, register)
  }

  private toRegister(form: FormGroup): Register {
    return {
      username: form.get('user')?.value,
      password: form.get('password')?.value,
      passwordMatch: form.get('password')?.value,
      name: form.get('firstname')?.value,
      lastname: form.get('lastname')?.value,
      phone: form.get('phone')?.value,
      email: form.get('user')?.value,
      street: form.get('street')?.value,
      buldingNumber: form.get('building')?.value,
      apartmentNumber: form.get('flat')?.value,
      city: form.get('city')?.value,
      zipCode: form.get("zip")?.value
    };
  }

}
