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
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isloading: boolean = true;
  NoOfRequests!: number;
  info:any[]=[];
  startups!:startup[];
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
  getstartups(){
    this.CRUDService.getStartup().subscribe(data => {this.startups=data;
    })
  }
  addingSector() {
    
    let dialogRef = this.dialog.open(AddSectorComponent, {
      width: '500px',
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
  getNoOfRequests() {
    this.CRUDService.getLength().subscribe(
      (response) => (this.NoOfRequests = response.length)
    );
  }
addingInfoToArray(){
  this.info =this.startups.map((object) => {
    return [object.companyName, object.sector, object.website,object.email,object.founder,object.phone,object.numOfEmployees,object.yearOfEstablishment,object.city];

  });
}
  exportPDF() {
    // html2canvas(this.el.nativeElement).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/jpeg');
this.addingInfoToArray();
      const pdf = new jsPDF('l');

    //   const imageProps = pdf.getImageProperties(imgData);

    //   const pdfw = pdf.internal.pageSize.getWidth();

    //   const pdfh = (imageProps.height * pdfw) / imageProps.width;

    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh);

    //   pdf.save('output.pdf');
    // });
   
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
