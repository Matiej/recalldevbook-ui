import { OrderItem } from "./orderItem";

export interface PlaceOrder {
  restOrderItemList: OrderItem[];
  name: string;
  lastname: string;
  phone: string;
  email: string;
  street: string;
  buldingNumber: string;
  apartmentNumber: string;
  city: string;
  zipCode: string;
  delivery: string;
}
