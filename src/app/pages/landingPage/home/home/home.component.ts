import { Component, OnInit } from '@angular/core';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  startups: startup[] = [];
  sectors: Sectors[] = [];
  constructor(private CRUDService: CRUDService) {}
  ngOnInit(): void {
    this.getStartups();
    this.getSectors();
  }
  getStartups() {
    this.CRUDService.getStartup().subscribe((response) => {
      console.log(response);
      this.startups = response;
    });
  }

  getSectors() {
    this.CRUDService.getSector().subscribe((response) => {
      this.sectors = response;
    });
  }
  filterStartups(sector: string) {
    this.CRUDService.filterStartups(sector).subscribe(
      (response) => (this.startups = response)
    );
  }
  reshowStartups() {
    this.CRUDService.getStartup().subscribe((response) => {
      this.startups = response;
    });
  }
  navigateToInfo(startup:startup){
console.log(startup);
  }
}
