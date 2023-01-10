import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css'],
})
export class AddStartupComponent implements OnInit {
  sectorCheckbox: Sectors[] = [];
  constructor(
    private fb: FormBuilder,
    private CRUDservice: CRUDService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getSectors();
  }
  form = this.fb.group({
    companyName: ['', [Validators.required]],
    logo: ['', [Validators.required, secureUrlValidatorFactory('https')]],
    city: ['', [Validators.required]],
    founder: [''],
    numOfEmployees: ['', [Validators.min(0)]],
    yearOfEstablishment: ['', [Validators.required, Validators.min(0)]],
    website: ['', [Validators.required, secureUrlValidatorFactory('https')]],
    email: [''],
    sector: this.fb.array([], Validators.required),
  });
  get urlWeb() {
    return this.form.get('website');
  }
  get urlImg() {
    return this.form.get('logoImage');
  }
  get sectors(): FormArray {
    return this.form.get('sector') as FormArray;
  }
  addSector(sector:string) {
    const sectorsFormGroup = new FormControl(
      sector,
      Validators.required
    );
    this.sectors.push(sectorsFormGroup);
    console.log(this.sectors);
  }
  // deleteSector(index: number) {
  //   this.sectors.removeAt(index);
  // }

  submit() {
    this.CRUDservice.addStartup({ ...this.form.value } as startup);
    this.router.navigate(['/admin']);
  }
  getSectors() {
    this.CRUDservice.getSector().subscribe((response) => {
      this.sectorCheckbox = response;
      console.log(this.sectorCheckbox)
    });
  };
  onChange(event:any,i:number,sector:string) {
  
    if (event.checked) {
      this.addSector(sector);
    }
    else {
     for (let i = 0; i < this.sectors.value.length; i++) {
       if (this.sectors.value[i] == sector) {
         this.sectors.removeAt(i);
       }
     }
     
    }
  };

}

function secureUrlValidatorFactory(urlStarter: string) {
  return (control: AbstractControl) => {
    let url = control.value;
    if (!url?.startsWith(urlStarter)) {
      return {
        insecureUrl: true,
      }; //error object
    } else return null; // valid
  };

  
}


