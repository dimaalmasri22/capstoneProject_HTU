import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  sectors: Sectors[] = [];
  sectorCheckbox: { sector: Sectors; isSelected: boolean }[] = [];
  startup?: startup;
  startup$!: Observable<startup | undefined>;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private CRUDservice: CRUDService,
    private router: Router
  ) {
   

    this.startup$ = this.route.paramMap.pipe(
      switchMap((value) => {
        this.id = value.get('id') + '';
        return this.CRUDservice.getStartupById(this.id);
      })
    );
  }

  ngOnInit(): void {
    this.startup$.subscribe((value) => {
      this.startup = value;

      this.getSectors(this.startup?.sector ?? []);
    });
  }
  editStartup(startup: any, sectorsStartup: any): void {

    if(this.startup && this.startup.sector){
    this.startup.sector = this.sectorCheckbox
      .filter((val) => val.isSelected)
      .map((e) => e.sector.sector);
    }console.log(this.startup)
    this.CRUDservice.updateStartup(this.id, {...startup, sector: this.startup?.sector});
    console.log(sectorsStartup);

    this.router.navigate(['/admin']);
  }

  getSectors(sectors: string[]) {
    console.log(sectors);
    this.CRUDservice.getSector().subscribe((response) => {
      this.sectors = response;
      this.sectorCheckbox = response.map((sector) => {
        console.log(sectors.indexOf(sector.sector) != -1);
        return {
          sector: sector,
          isSelected: sectors.indexOf(sector.sector) != -1,
        };
      });
    });
  }

  
  checkSector(obj: any){
    console.log(this.sectorCheckbox);
    obj.isSelected = !obj.isSelected  ;
  }
}




