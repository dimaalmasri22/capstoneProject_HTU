import { Component, OnInit } from '@angular/core';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  startups: startup[] = [];
  constructor(private startupService: CRUDService) {}
  ngOnInit(): void {
    this.getStartups();
  }
  getStartups() {
    this.startupService.getStartup().subscribe((response) => {
      console.log(response);
      this.startups = response;
    });
  }
}
