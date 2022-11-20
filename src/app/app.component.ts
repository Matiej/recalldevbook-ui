import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './catalog/book';
import { CatalogService } from './catalog/catalog.service';
import { HealthcheckService } from './admin/healthcheck.service';
import { CartItem } from './cart/cartitem';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recalldevbookUI';
  public bookList: Book[];
  public isLoading: boolean = false;
  public cartItemList: CartItem[] = [];
  private intervalId: any;
  private readonly INTERVAL_TIME: number = 3000;
  orderFormular: FormGroup;

  constructor(private catalogServ: CatalogService, private healthService: HealthcheckService) {
    this.healthService.healthCheckJob();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCatalog();
    this.initForm();
  }

  private initForm(): void{
    this.orderFormular = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      street: new FormControl(null),
      city: new FormControl(null),
      zip: new FormControl(null)
    });
  }

  public getCatalog(): void {
    //todo add backend method to get all wihout limit
    this.catalogServ.getCatalog('255').subscribe({
      next: (importedBooks: Book[]) => {
        this.bookList = importedBooks;
        if (importedBooks) {
          this.isLoading = false;
          if (this.intervalId) {
            clearInterval(this.intervalId);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        this.interv();
        console.error('error message for getCatalgo: ' + error.message)
      }
    })
  }

  private interv(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => this.ngOnInit(), this.INTERVAL_TIME);
    }
  }

  public addToCart(book: Book): void {
    const current: CartItem = this.cartItemList.find(item => item.book.id == book.id) as CartItem;
    if (current) {
      current.quantity += 1;
    } else {
      this.cartItemList.push({ book: book, quantity: 1 } as CartItem)
    }
    console.log('Cart: ' + JSON.stringify(this.cartItemList));
  }

  public countCartItems(): number {
    return this.cartItemList
      .reduce((sum: number, current: CartItem) => sum + current.quantity, 0);
  }

  public totalCartAmount(): number {
    return this.cartItemList
      .reduce((sum: number, current: CartItem) => sum + current.book.price * current.quantity, 0);
  }

  public clearCart() {
    this.cartItemList = [];
  }

  public onOpenModal(mode: string): void {
    console.log('CART ONMODAL');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'cart') {
      button.setAttribute('data-target', '#cartModal');
    }
    if (mode === 'order') {
      button.setAttribute('data-target', '#orderModal');
    }
    if (container != null) {
      console.log('container no null' + container);
      container.appendChild(button);
    }
    button.click();
  }

  public onOrderSubmit(): void {
    console.log('FORMULAR VIEW');
    console.log(this.orderFormular);
  }
}
