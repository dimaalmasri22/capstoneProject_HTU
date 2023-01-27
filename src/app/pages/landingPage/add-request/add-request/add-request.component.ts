import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { FilestorageService } from 'src/app/lib/services/storage/filestorage.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
})
export class AddRequestComponent {
  loading:boolean = false;
  downloadUrl?: string;
  sectorCheckbox: Sectors[] = [];
  constructor(
    private fb: FormBuilder,
    private CRUDservice: CRUDService,
    private router: Router,
    private storage: FilestorageService
  ) {
    
  }
  ngOnInit(): void {
    this.getSectors();
  }
  form = this.fb.group({
    companyName: ['', [Validators.required]],
    // logo: ['', [Validators.required, secureUrlValidatorFactory('https')]],
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
  }

  submit() {
    
    this.CRUDservice.addStartupRequest({ ...this.form.value,logo:this.downloadUrl } as startup);
    alert('adding startup request has been submitted ');
    this.router.navigate(['/']);
  }
  getSectors() {
    this.CRUDservice.getSector().subscribe((response) => {
      this.sectorCheckbox = response;
      console.log(this.sectorCheckbox);
    });
  }
  onChange(event: any, i: number, sector: string) {
    console.log(event.checked);
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
    console.log(event)
 
    let file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.loading = true;
      this.storage.uploadimage(file).subscribe((value) => {
        this.loading = false;
        this.downloadUrl = value;
       
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

