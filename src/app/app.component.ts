import { Component, ViewChild } from '@angular/core';
import { LoadingService } from './lib/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'startupsJo';
  loading$ = this.loader.loading$;
  // @ViewChild('content', { static: false }) el!: Element;
  constructor(public loader: LoadingService) {}
}
