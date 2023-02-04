import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
import { AddSectorComponent } from 'src/app/pages/admin/add-sector/add-sector.component';
//  import html2canvas from 'html2canvas';
 import jsPDF from 'jspdf';
import { startup } from 'src/app/lib/interfaces/startup';
import autoTable from 'jspdf-autotable';
import { LoadingService } from 'src/app/lib/services/loading/loading.service';
import { DeleteSectorComponent } from 'src/app/pages/admin/delete-sector/delete-sector.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
 
  NoOfRequests!: number;
  info: any[] = [];
  startups!: startup[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private CRUDService: CRUDService
  ) {}
  showFiller = false;
  @ViewChild('content', { static: true }) el!: ElementRef<HTMLImageElement>;
  ngOnInit(): void {
    this.getNoOfRequests();
    this.getstartups();
  }
  getstartups() {
    this.CRUDService.getStartup().subscribe((data) => {
      this.startups = data;
    });
  }
  addingSector() {
    let dialogRef = this.dialog.open(AddSectorComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
  deletingSector(){
     let dialogRef = this.dialog.open(DeleteSectorComponent, {
       width: '150%',
       height: '600px',

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
    window.location.reload();
  }
  getNoOfRequests() {
    this.CRUDService.getLength().subscribe(
      (response) => (this.NoOfRequests = response.length)
    );
  }
  addingInfoToArray() {
    this.info = this.startups.map((object) => {
      return [
        object.companyName,
        object.sector,
        object.website,
        object.email,
        object.founder,
        object.phone,
        object.numOfEmployees,
        object.yearOfEstablishment,
        object.city,
      ];
    });
  }
  exportPDF() {
 
    this.addingInfoToArray();
    const pdf = new jsPDF('l');
    autoTable(pdf, {
      startY: false,
      theme: 'striped',
      tableWidth: 'auto',
      showHead: 'everyPage',
      tableLineColor: 300,
      tableLineWidth: 0,
      head: [
        [
          'company Name',
          'Sector',
          'website',
          'email',
          'founder name',
          'phone number',
          'number of employees',
          'year of establishment',
          'city',
        ],
      ],
      body: this.info,
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 40 },
        4: { cellWidth: 'auto' },
        5: { cellWidth: 30 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 },
        8: { cellWidth: 20 },
        // etc
      },

      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        font: 'arial',
        fontSize: 7,
        cellPadding: 2,
      },
    });

    pdf.save('table.pdf');
  }
}
