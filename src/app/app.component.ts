import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Interceptor';
  public loading = false;


  public items: any = [];

  constructor(private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loaderService
    .getSpinnerObs().subscribe(val => {
      this.loading = val;
    })
  }
  public clickAPI() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((result) => {
      console.log('res', result);
      this.items = result;
    });
  }

  public clear() {
    this.items = [];
  }
}
