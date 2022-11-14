import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './catalog/book';
import { CatalogService } from './catalog/catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recalldevbookUI';
  public bookList: Book[];

  constructor(private catalogServ: CatalogService) { }

  ngOnInit(): void {
    this.getCatalog();
  }

  public getCatalog(): void {
    this.catalogServ.getCatalog('255').subscribe({
      next: (importedBooks: Book[]) => {
        this.bookList = importedBooks;
      },
      error: (error: HttpErrorResponse) => console.error('error message for getCatalgo: ' + error.message)
    })
  }
}
