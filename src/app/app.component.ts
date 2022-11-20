import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './catalog/book';
import { CatalogService } from './catalog/catalog.service';
import { HealthcheckService } from './admin/healthcheck.service';
import { CartItem } from './cart/cartitem';

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

  constructor(private catalogServ: CatalogService, private healthService: HealthcheckService) {
    this.healthService.healthCheckJob();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCatalog();
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
