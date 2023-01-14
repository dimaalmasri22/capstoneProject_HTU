import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { AddSectorComponent } from 'src/app/pages/admin/add-sector/add-sector.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  
  NoOfRequests!: number;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private CRUDService:CRUDService
  ) {}
  showFiller = false;

  ngOnInit(): void {
    this.getNoOfRequests();
  }
  addingSector() {
    let dialogRef = this.dialog.open(AddSectorComponent, {
      width: '445px',
      height: '366px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
  logout() {
    this.auth.signOut().then(() => {
      //navigate to auth
      this.router.navigate(['/auth']);
    });
  }
  getNoOfRequests(){this.CRUDService.getLength().subscribe((response)=>this.NoOfRequests=response.length)}
}
