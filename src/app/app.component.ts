import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Interceptor';
  constructor(    private http: HttpClient,
    ) {}

  public clickAPI() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((result) => {
      // console.log('res', result);
      
    });
  }
}
