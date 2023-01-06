import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css'],
})
export class AddStartupComponent {
  constructor(
    private fb: FormBuilder,
    private startupsService: CRUDService,
    private router: Router
  ) {}
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
  addSector() {
    const sectorsFormGroup = new FormControl('', Validators.required);
    this.sectors.push(sectorsFormGroup);
  }
  deleteSector(index: number) {
    this.sectors.removeAt(index);
  }

  submit() {
    this.startupsService.addStartup({ ...this.form.value } as startup);
    this.router.navigate(['/admin']);
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


