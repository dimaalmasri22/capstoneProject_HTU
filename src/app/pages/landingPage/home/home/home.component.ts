import { Component, HostListener,OnDestroy,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { LoadingService } from 'src/app/lib/services/loading/loading.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sectors: Sectors[] = [];
  cities: string[] = [];
  NoOfEmployees: number[] = [];
  YearOfEstablishment: number[] = [];
  citySelected?: string;
  sectorSelected?: string;
  yearSelected?: number;
  employeesSelected?: number;
  fade: boolean = false;
  show: boolean = false;
  startups: startup[] = [];

  destroy?: Subscription;

  constructor(
    private CRUDService: CRUDService,
    private loader: LoadingService
  ) {}
  ngOnInit(): void {
        this.loader.show();
    this.getStartups();
    this.getSectors();

  }

  getStartups() {

    this.CRUDService.getStartup().subscribe((response) => {
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
          this.loader.hide();
    });
  }

  getSectors() {
    this.CRUDService.getSector().subscribe((response) => {
      this.sectors = response;
          
    });
  }

  filterSector(sector: string) {
    this.sectorSelected = sector;

    this.CRUDService.filterStartups(sector).subscribe(
      (response) => {this.startups = response;
      
      }
    );
  }
  filterCity(city: string) {
    this.citySelected = city;
    this.CRUDService.filterStartupsCity(city).subscribe(
      (response) => {this.startups = response; 
      
      }
    );
  }
  filterEmployees(employee: number) {
    this.employeesSelected = employee;
    this.CRUDService.filterStartupsEmployee(employee).subscribe(
      (response) => {this.startups = response;}
    );
  }
  filterYear(year: number) {
    this.yearSelected = year;
    this.CRUDService.filterStartupsYear(year).subscribe(
      (response) => {this.startups = response; 
     
      }
    );
  }
  //flitering
  filtering() {
    this.CRUDService.filteringHome(
      this.sectorSelected,
      this.citySelected,
      this.yearSelected,
      this.employeesSelected
    ).subscribe((response) => {
      this.startups = response;
     
    });
  }
  // reshow the startups
  reshowStartupsS() {
    this.sectorSelected = undefined;
    this.getStartups();
  }
  reshowStartupsC() {
    this.citySelected = undefined;
    this.getStartups();
  }
  reshowStartupsE() {
    this.employeesSelected = undefined;
    this.getStartups();
  }
  reshowStartupsY() {
    this.yearSelected = undefined;
    this.getStartups();
  }
  @HostListener('document:scroll') scrollfunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  ngOnDestroy(): void {
    this.destroy?.unsubscribe();
  }
}
