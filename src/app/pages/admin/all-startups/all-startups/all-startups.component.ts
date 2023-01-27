
import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { DeleteComponent } from '../delete/delete.component';
import { LoadingService } from 'src/app/lib/services/loading/loading.service';
@Component({
  selector: 'app-all-startups',
  templateUrl: './all-startups.component.html',
  styleUrls: ['./all-startups.component.css'],
})
export class AllStartupsComponent implements OnInit {
  NoOfRequests!: number;
  NoOfSectors!: number;
  NoOfStartups!: number;
  sectors: Sectors[] = [
    {
      sector: '',
      isSelected: false,
    },
  ];

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

  constructor(private CRUDService: CRUDService, public dialog: MatDialog,private loader:LoadingService) {}

  ngOnInit(): void {
    this.getSectors();
    this.getStartups();
    this.getNoOfRequests();
    this.getNoOfsectors();
    this.getNoOfstartups();
    this.loader.hide();
  }
  getStartups() {
    this.CRUDService.getStartup().subscribe((response) => {
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
      this.getStartups();
        this.loader.hide();
    });
  }
  // get sectors to filter
  getSectors() {
    this.CRUDService.getSector().subscribe((response) => {
      this.sectors = response;
    });
  }
  filterStartups(sector: string) {
    this.CRUDService.filterStartups(sector).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }
  reshowStartups() {
    this.CRUDService.getStartup().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
       this.loader.hide();
    });
  }
  // numbers  on cards
  getNoOfsectors() {
    this.CRUDService.getLengthSector().subscribe(
      (response) => (this.NoOfSectors = response.length)
    );
  }
  getNoOfRequests() {
    this.CRUDService.getLength().subscribe(
      (response) => (this.NoOfRequests = response.length)
    );
  }
  getNoOfstartups() {
    this.CRUDService.getLengthStartup().subscribe(
      (response) => (this.NoOfStartups = response.length)
    );
  }
}
