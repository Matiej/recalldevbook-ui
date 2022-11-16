import { Author } from "../author/author";

export class Book {

  private _id: number;
  private _title: string;
  private _year: number;
  private _price: number;
  private _bookCoverUrl: string;
  private _available: number;
  private _authors: Author[];

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

  public get bookCoverUrl(): string {
    return this._bookCoverUrl;
  }

  public get available(): number {
    return this._available;
  }

  public get authors(): Author[] {
    return this._authors;
  }
}

