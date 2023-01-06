import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { AddSectorComponent } from 'src/app/pages/admin/add-sector/add-sector.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}
  showFiller = false;

  addingSector() {
    let dialogRef = this.dialog.open(AddSectorComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
  logout() {
    this.auth
      .signOut()
      .then(() => {
        //navigate to auth
        this.router.navigate(['/auth']);
      });
  }
}
