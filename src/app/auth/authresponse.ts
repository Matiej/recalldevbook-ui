export class AuthResponse {
  private _username: string;
  private _roles: string[];

  public get username(): string {
    return this._username;
  }

  public get roles(): string[] {
    return this._roles;
  }
}
