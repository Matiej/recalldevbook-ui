import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CartItem } from '../cart/cartitem';
import { OrderItem } from './orderItem';
import { PlaceOrder } from './placeOrder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public submitOrder(form: FormGroup, cartitems: CartItem[]): Observable<any> {
    const placeOrder: PlaceOrder = this.toPlaceOrder(form, cartitems);
    return this.http.post<PlaceOrder>(`${this.apiServerUrl}/orders`, placeOrder)
  }

  private toPlaceOrder(form: FormGroup, cartitems: CartItem[]): PlaceOrder {
    const placeOrder: PlaceOrder = {
      name: form.get('firstname')?.value,
      lastname: form.get('lastname')?.value,
      phone: form.get('phone')?.value,
      email: form.get('email')?.value,
      street: form.get('street')?.value,
      buldingNumber: form.get('building')?.value,
      apartmentNumber: form.get('flat')?.value,
      city: form.get('city')?.value,
      zipCode: form.get("zip")?.value,
      restOrderItemList: this.toItemList(cartitems),
      delivery: 'SELF_PICKUP'
    };
    return placeOrder;
  }

  private toItemList(cartitems: CartItem[]): OrderItem[] {
    return cartitems.map(item => {
      return { bookId: item.book.id, quantity: item.quantity } as OrderItem
    })
  }
}
