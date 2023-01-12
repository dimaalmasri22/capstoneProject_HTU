import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';


@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css'],
})
export class AddSectorComponent {
  constructor(
    private crudService: CRUDService,
    private dialogRef: MatDialogRef<AddSectorComponent>,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}
  form = this.fb.group({
    sector: [''],
    isSelected: [false],
  });

  submit() {
    //  add Sector
    this.crudService
      .addSector({ ...this.form.value } as Sectors)
      .subscribe((_) => {
      
        this.dialogRef.close(true);
      });
  }
  closeTheDialogue() {
    this.dialogRef.close(true);
  }
}


