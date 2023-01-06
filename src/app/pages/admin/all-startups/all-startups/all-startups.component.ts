
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { DeleteComponent } from '../../delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { Sectors } from 'src/app/lib/interfaces/sector';
@Component({
  selector: 'app-all-startups',
  templateUrl: './all-startups.component.html',
  styleUrls: ['./all-startups.component.css'],
})
export class AllStartupsComponent implements OnInit {
  // startups: startup[] = [];
  sectors: Sectors[] = [];

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

  constructor(private CRUDService: CRUDService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStartups();
    this.getSectors();
  }
  getStartups() {
    this.CRUDService.getStartup().subscribe((response) => {
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
  deleteStartup(id: string) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //refresh table
      //this.students = this.studentsService.getStudents();
      this.getStartups();
    });
  }
  // get sectors in filter
  getSectors() {
    this.CRUDService.getSector().subscribe((response) => {
      this.sectors=response
    });
  }
}
