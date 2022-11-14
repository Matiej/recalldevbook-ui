import { Author } from "../author/author";

export class Book {

  private _id: number;
  private _title: string;
  private _year: number;
  private _price: number;
  private _coverUrl: string;
  private _bookCoverId: string;
  private _available: number;
  private _linkedAuthors: Author[];

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get year(): number {
    return this._year;
  }

  public get price(): number {
    return this._price;
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

  public get linkedAuthors(): Author[] {
    return this._linkedAuthors;
  }

  public get bookCoverId(): string {
    return this._bookCoverId;
  }
}

