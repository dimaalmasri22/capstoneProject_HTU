import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sectors } from 'src/app/lib/interfaces/sector';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';

@Component({
  selector: 'app-delete-sector',
  templateUrl: './delete-sector.component.html',
  styleUrls: ['./delete-sector.component.css'],
})
export class DeleteSectorComponent implements OnInit {
  destroy?: Subscription;
  alert?:boolean = false;
  public FilterStartup?:any;
  public sectorSelected?:string;
  constructor(
    private crudService: CRUDService,
    private dialogRef: MatDialogRef<DeleteSectorComponent>,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}
  form = this.fb.group({
    sector: [''],
    isSelected: [false],
  });
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Sector Name',
    'Delete',
  ];
ngOnInit(): void {
  this.getSectors();
}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getSectors() {
    this.crudService.getSector().subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    this.alert = false;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteSector(id:string,sectorSelected:string) {
    //delete startup
    this.sectorSelected=sectorSelected
     this.alert = false;
this.crudService.filterStartups(sectorSelected).subscribe(response=>{
  this.FilterStartup=response.length;
  if(response.length === 0){
    this.crudService.DeleteSector(id).subscribe((_) => {
      this.dialogRef.close(true); 
    });
  }
  else {
    this.alert = true;
  
  
  
  }
     
})

  }
  
  closeTheDialogue() {
    this.dialogRef.close(true);
  }
  ngOnDestroy(): void {
    this.destroy?.unsubscribe();
  }
}
