import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { AddSectorComponent } from 'src/app/pages/admin/add-sector/add-sector.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}
  showFiller = false;
 
ngOnInit():void {
 
}
  addingSector() {
    let dialogRef = this.dialog.open(AddSectorComponent, {
      width: '38%',
      height:'50%',
      
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
