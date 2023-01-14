
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { FilestorageService } from 'src/app/lib/services/storage/filestorage.service';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css'],
})
export class AddStartupComponent implements OnInit {
  sectorCheckbox: Sectors[] = [];
  downloadUrl?: string;
  constructor(
    private fb: FormBuilder,
    private CRUDservice: CRUDService,
    private router: Router,
    private storage: FilestorageService
  ) {}
  ngOnInit(): void {
    this.getSectors();
  }
  form = this.fb.group({
    companyName: ['', [Validators.required]],
    // logo: ['', [Validators.required, secureUrlValidatorFactory('https')]],
    // logo:this.downloadUrl,
    city: ['', [Validators.required]],
    founder: [''],
    numOfEmployees: ['', [Validators.min(0)]],
    yearOfEstablishment: ['', [Validators.required, Validators.min(0)]],
    website: ['', [Validators.required, secureUrlValidatorFactory('https')]],
    email: [''],
    phone: [''],
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
  addSector(sector: string) {
    const sectorsFormGroup = new FormControl(sector, Validators.required);
    this.sectors.push(sectorsFormGroup);
    console.log(this.sectors);
  }
  // deleteSector(index: number) {
  //   this.sectors.removeAt(index);
  // }

  submit() {
    this.CRUDservice.addStartup({ ...this.form.value ,logo:this.downloadUrl} as startup);
    this.router.navigate(['/admin']);
  }
  getSectors() {
    this.CRUDservice.getSector().subscribe((response) => {
      this.sectorCheckbox = response;
    });
  }
  onChange(event: any, i: number, sector: string) {
    if (event.checked) {
      this.addSector(sector);
    } else {
      for (let i = 0; i < this.sectors.value.length; i++) {
        if (this.sectors.value[i] == sector) {
          this.sectors.removeAt(i);
        }
      }
    }
  }
  upload(event: Event) {
    // console.log(event);
    let file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.storage.uploadimage(file).subscribe((value) => {
        this.downloadUrl = value;
      console.log(value);
      });
    }
  }
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


