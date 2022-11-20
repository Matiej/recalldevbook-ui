import { Book } from "../catalog/book";

export class CartItem {
  private _book: Book;
  private _quantity: number;

  public get book(): Book {
    return this._book;
  }
  public set Book(value: Book) {
    this._book = value;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    this._quantity = value;
  }

}
