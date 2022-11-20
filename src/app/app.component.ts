import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './catalog/book';
import { CatalogService } from './catalog/catalog.service';
import { HealthcheckService } from './admin/healthcheck.service';
import { CartItem } from './cart/cartitem';
import { getCurrentRequest } from 'loader-utils';

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

  constructor(private catalogServ: CatalogService, private healthService: HealthcheckService) {
    this.healthService.healthCheckJob();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCatalog();
  }

  public getCatalog(): void {
    console.log(this.isLoading);
    this.catalogServ.getCatalog('255').subscribe({
      next: (importedBooks: Book[]) => {
        this.bookList = importedBooks;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => console.error('error message for getCatalgo: ' + error.message)
    })
  }

  public addToCart(book: Book): void {
    const current: CartItem = this.cartItemList.find(item => item.bookId == book.id) as CartItem;
    if (current) {
      current.quantity += 1;
    } else {
      this.cartItemList.push({ bookId: book.id, quantity: 1 } as CartItem)
    }
    console.log('Cart: ' + JSON.stringify(this.cartItemList));
  }

  public countCartItems(): number {
    return this.cartItemList
    .reduce((sum: number, current: CartItem) => sum + current.quantity, 0);
  }
}
