export class AuthResponse {
  private _username: string;
  private _sessionid: string;
  private _roles: string[];

  public get username(): string {
    return this._username;
  }

  public get sessionid(): string {
    return this._sessionid;
  }

  public get roles(): string[] {
    return this._roles;
  }
}
