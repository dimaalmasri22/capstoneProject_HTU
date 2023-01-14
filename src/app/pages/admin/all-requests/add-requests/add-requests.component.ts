import { Component ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-add-requests',
  templateUrl: './add-requests.component.html',
  styleUrls: ['./add-requests.component.css'],
})
export class AddRequestsComponent {
  constructor(
    private startupsService: CRUDService,
    private dialogRef: MatDialogRef<AddRequestsComponent>,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  confirm() {
    this.startupsService.approveRequest(this.data.id,this.data.data);
    this.dialogRef.close(true);
  }
}
