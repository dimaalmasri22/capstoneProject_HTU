import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  sectorCheckbox: Sectors[] = [];
  startup?: startup;
  startup$!: Observable<startup | undefined>;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private CRUDservice: CRUDService,
    private router: Router
  ) {
    // this.route.paramMap.subscribe((response)=> {
    //      this.id = response.get('id');
    //      //get students
    //      this.student = { ... this.studentService.getStudentById(this.id)};

    // });

    this.startup$ = this.route.paramMap.pipe(
      switchMap((value) => {
        this.id = value.get('id') + '';
        return this.CRUDservice.getStartupById(this.id);
      })
      
    );
   
   
  }
  ngOnInit():void{
    this.getSectors();

  }
  editStartup(startup: any,sectorsStartup: any):void {
    this.CRUDservice.updateStartup(this.id, startup);
    console.log(sectorsStartup);
    
    this.router.navigate(['/admin']);
  }

  getSectors() {
    this.CRUDservice.getSector().subscribe((response) => {
      this.sectorCheckbox = response;
     
    });
  }
  // addSector(){

  // }
  // onChange(event: any, i: number, sector: string) {
  //   if (event.checked) {
  //     this.addSector(sector);
  //   } else {
  //     let x = this.sectors.removeAt(i);
  //   }
  checkIfCheckedBefore(startup:any){
           console.log(startup);
           for(let i=0; i<this.sectorCheckbox.length; i++){
            if(this.sectorCheckbox[i]==startup[i]){this.sectorCheckbox[i].isSelected=true}
           }
           
  }
}




