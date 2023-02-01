import { Component, ViewChild } from '@angular/core';
import { LoadingService } from './lib/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'startupsJo';
  loading$ = this.loader._loading;
  constructor(public loader: LoadingService) {
  }

}
