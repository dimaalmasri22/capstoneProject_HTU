import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { startup } from 'src/app/lib/interfaces/startup';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
@Component({
  selector: 'app-startup-info',
  templateUrl: './startup-info.component.html',
  styleUrls: ['./startup-info.component.css']
})
export class StartupInfoComponent implements OnInit {
  startup$!: Observable<startup|undefined>;
  startupInfo?: startup;
  id!: string;
constructor ( private route:ActivatedRoute,  private CRUDservice: CRUDService,
    private router: Router){
 this.startup$ = this.route.paramMap.pipe(
   switchMap((value) => {
     this.id = value.get('id') + '';
     return this.CRUDservice.getStartupById(this.id);
   })
 );
     
}

  ngOnInit() {
    this.startup$.subscribe((value) => {
      this.startupInfo = value;
     
    });
  }
  goBackToHome(){
    this.router.navigate(['/']);
  }
}
