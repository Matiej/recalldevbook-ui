import { Author } from "../author/author";

export class Book {

  private _id: number;
  private _title: string;
  private _year: number;
  private _price: number;
  private _coverUrl: string;
  private _available: number;
  private _authors: Author[];

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get year(): number {
    return this._year;
  }

  public set year(value: number) {
    this._year = value;
  }

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
  }

  public get coverUrl(): string {
    return this._coverUrl;
  }

  public set coverUrl(value: string) {
    this._coverUrl = value;
  }

  public get available(): number {
    return this._available;
  }
  public set available(value: number) {
    this._available = value;
  }



}

