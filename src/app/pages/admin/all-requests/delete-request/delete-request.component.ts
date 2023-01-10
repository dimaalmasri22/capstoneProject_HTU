import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-delete-request',
  templateUrl: './delete-request.component.html',
  styleUrls: ['./delete-request.component.css'],
})
export class DeleteRequestComponent {
  constructor(
    private startupsService: CRUDService,
    private dialogRef: MatDialogRef<DeleteRequestComponent>,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  confirm() {
    console.log(this.data);
    //delete student
    this.startupsService.deleteRequest(this.data.id).subscribe((_) => {
      this.dialogRef.close(true);
    });
  }
}
