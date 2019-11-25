import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public spinnerOpenSubj = new BehaviorSubject<boolean>(false);
 
  constructor() { }

  public getSpinnerObs(): Observable<boolean> {
    return this.spinnerOpenSubj.asObservable();
  }


  show() {
    this.spinnerOpenSubj.next(true);
  }

  hide() {
    this.spinnerOpenSubj.next(false);
  }
}
