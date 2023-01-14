import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { AddRequestsComponent } from '../add-requests/add-requests.component';
import { DeleteRequestComponent } from '../delete-request/delete-request.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent {
  Allrequests: startup[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Logo',
    'Company Name',
    'City',
    'Sector',
    'Year Of Establishment',
    'Website',
    'Edit',
    'Delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private CRUDservice: CRUDService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStartups();
  }
  getStartups() {
    this.CRUDservice.getRequests().subscribe((response) => {
      // this.startups = response;

      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addStartupRequest(id: string,data:startup[]) {
    let dialogRef = this.dialog.open(AddRequestsComponent, {
      width: '500px',
      height: '250px',
      data: { id: id,data: data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //refresh table
      this.getStartups();
    });
  }
  deleteStartup(id: string) {
    let dialogRef = this.dialog.open(DeleteRequestComponent, {
      width: '500px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //refresh table
      this.getStartups();
    });
  }
}
