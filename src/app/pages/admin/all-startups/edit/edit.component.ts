import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { LoadingService } from 'src/app/lib/services/loading/loading.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { FilestorageService } from 'src/app/lib/services/storage/filestorage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  hide?:boolean=false;
  downloadUrl?: string;
  sectors: Sectors[] = [];
  sectorCheckbox: { sector: Sectors; isSelected: boolean }[] = [];
  startup?: startup;
  startup$!: Observable<startup | undefined>;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private CRUDservice: CRUDService,
    private router: Router,
    private storage: FilestorageService,
    private loader:LoadingService
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
this.loader.hide();
      this.getSectors(this.startup?.sector ?? []);
    });
  }
  editStartup(startup: any, sectorsStartup: any): void {
    if (this.startup && this.startup.sector) {
      this.startup.sector = this.sectorCheckbox
        .filter((val) => val.isSelected)
        .map((e) => e.sector.sector);
    }
   if(this.downloadUrl){ this.CRUDservice.updateStartup(this.id, {
     ...startup,
     sector: this.startup?.sector,
     logo: this.downloadUrl,
   });}
   else{ this.CRUDservice.updateStartup(this.id, {
     ...startup,
     sector: this.startup?.sector
   });}
   
   

    this.router.navigate(['/admin']);
  }

  getSectors(sectors: string[]) {
    this.CRUDservice.getSector().subscribe((response) => {
      this.sectors = response;
      this.sectorCheckbox = response.map((sector) => {
        return {
          sector: sector,
          isSelected: sectors.indexOf(sector.sector) != -1,
        };
      });
    });
  }

  checkSector(obj: any) {
    obj.isSelected = !obj.isSelected;
  }

  upload(event: Event) {
    // console.log(event);
    let file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.storage.uploadimage(file).subscribe((value) => {
        this.downloadUrl = value;
        this.hide=true;
     
      });
    }
  }
}




