export class CartItem {
  private _bookId: number;
  private _quantity: number;

  public get bookId(): number {
    return this._bookId;
  }

  public set bookId(value: number) {
    this._bookId = value;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    this._quantity = value;
  }

}
