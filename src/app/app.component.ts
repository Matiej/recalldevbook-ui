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

  constructor(private catalogServ: CatalogService) { }

  ngOnInit(): void {
    this.getCatalog();
  }

  public getCatalog(): void {
    this.catalogServ.getCatalog('255').subscribe({
      next: (importedBooks: Book[]) => {
        console.log("Got books from backend");
        importedBooks.forEach(book => {
          console.log(book.available);
          console.log(book.id);
          console.log(book.title);
          console.log("just object json: ")
          console.log(book);
        });
      },
      error: (error: HttpErrorResponse) => console.error('error message for getCatalgo: ' + error.message)
    })
  }
}
