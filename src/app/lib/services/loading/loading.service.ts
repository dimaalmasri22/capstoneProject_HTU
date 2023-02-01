import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public _loading = new BehaviorSubject<boolean>(false);


  constructor() {}

  show() {
    this._loading.next(true);
    
  }

  hide() {
    

    this._loading.next(false);
  }
}
