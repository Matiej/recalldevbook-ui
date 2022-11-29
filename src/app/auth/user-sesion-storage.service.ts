import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSesionStorageService {

  constructor() { }
  private readonly USERNAME_ITEM_FOR_SESSION: string = 'auth_user';

  public saveUserSesion(user: any): void {
    window.sessionStorage.removeItem(this.USERNAME_ITEM_FOR_SESSION);
    window.sessionStorage.setItem(this.USERNAME_ITEM_FOR_SESSION,
      JSON.stringify(user));
  }

  public isUserLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USERNAME_ITEM_FOR_SESSION);
    return user != null;
  }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public removeItem(): void {
    window.sessionStorage.removeItem(this.USERNAME_ITEM_FOR_SESSION);
  }

  public getSessionUser(): any {
    const user = window.sessionStorage.getItem(this.USERNAME_ITEM_FOR_SESSION);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
