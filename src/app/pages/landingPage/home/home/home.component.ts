import { Component, HostListener, OnInit } from '@angular/core';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sectors: Sectors[] = [];
  cities: string[] = [];
  NoOfEmployees: number[] = [];
  YearOfEstablishment: number[] = [];
  citySelected!: string;
  sectorSelected!: string;
  yearSelected!: number;
  employeesSelected!: number;
  fade: boolean = false;
  startups: startup[] = [];
  constructor(private CRUDService: CRUDService) {}
  ngOnInit(): void {
    this.getStartups();
    this.getSectors();
  }
  getStartups() {
    this.CRUDService.getStartup().subscribe((response) => {
      console.log(response);
      this.startups = response;
      response.forEach((response) => {
        if (response.city && this.cities.indexOf(response.city) === -1) {
          this.cities.push(response.city);
        }
        if (
          response.numOfEmployees &&
          this.NoOfEmployees.indexOf(response.numOfEmployees) === -1
        ) {
          this.NoOfEmployees.push(response.numOfEmployees);
        }
        if (
          response.yearOfEstablishment &&
          this.YearOfEstablishment.indexOf(response.yearOfEstablishment) === -1
        ) {
          this.YearOfEstablishment.push(response.yearOfEstablishment);
        }
      });
    });
  }

  getSectors() {
    this.CRUDService.getSector().subscribe((response) => {
      this.sectors = response;
    });
  }

  // filters
  // filterStartups(sector: string) {
  //   this.CRUDService.filterStartups(sector).subscribe(
  //     (response) => (this.startups = response)
  //   );
  // }
  filterSector(sector:string){
    this.sectorSelected = sector;
    
 this.CRUDService.filterStartups(sector).subscribe(
   (response) => (this.startups = response)
 )}
  filterCity(city: string) {
    
      this.citySelected = city;
    this.CRUDService.filterStartupsCity(city).subscribe(
      (response) => (this.startups = response)
    );
  }
  filterEmployees(employee: number) {
  
      this.employeesSelected = employee;
    this.CRUDService.filterStartupsEmployee(employee).subscribe(
      (response) => (this.startups = response)
    );
  }
  filterYear(year: number) {
    
      this.yearSelected = year;
   this.CRUDService.filterStartupsYear(year).subscribe(
     (response) => (this.startups = response)
   );
  }
  //flitering
  filtering() {
    this.CRUDService.filteringHome(
      this.sectorSelected,
      this.citySelected,
      this.yearSelected,
      this.employeesSelected
    ).subscribe(response => {this.startups = response; console.log(response);});
  }
  // reshow the startups
  reshowStartups() {
     this.getStartups();
  }
  @HostListener('document:scroll') scrollfunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.fade = true;
    } else {
      this.fade = false;
    }
  }
}
