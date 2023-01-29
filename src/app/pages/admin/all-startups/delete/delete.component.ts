import { Component, Inject, OnDestroy } from '@angular/core';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnDestroy {
  destroy?: Subscription;
  constructor(
    private startupsService: CRUDService,
    private dialogRef: MatDialogRef<DeleteComponent>,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  confirm() {
    //delete startup
    this.startupsService.deleteStartup(this.data.id).subscribe((_) => {
      this.dialogRef.close(true);
    });
  }
  closeTheDialogue() {
    this.dialogRef.close(true);
  }
  ngOnDestroy(): void {
    this.destroy?.unsubscribe();
  }
}
