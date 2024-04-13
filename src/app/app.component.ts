import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    HttpClientModule
  ]
  
})
export class AppComponent implements OnInit {
  title = 'booksapp';
  readonly APIUrl = "http://localhost:5038/api/books/";
  books: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshBooks();
  }

  refreshBooks() {
    this.http.get<any[]>(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data;
    });
  }

  addBook() {
    const newBook = (<HTMLInputElement>document.getElementById("newBook")).value;
    const newDesc = (<HTMLInputElement>document.getElementById("newDesc")).value;
    const newPrice = (<HTMLInputElement>document.getElementById("newPrice")).value;

    const formData = new FormData();
    formData.append("title", newBook);
    formData.append("description", newDesc);
    formData.append("price", newPrice);

    this.http.post(this.APIUrl + 'AddBook', formData).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }

  // deleteBook(id: any) {
  //   this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
  //     alert(data);
  //     this.refreshBooks();
  //    }
  //   );
  // }
  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(
        () => {
            alert("Deleted successfully!");
            this.refreshBooks();
        },
        (error) => {
            console.error("Error deleting book:", error);
            alert("Failed to delete book. Please try again.");
        }
    );
}
}
