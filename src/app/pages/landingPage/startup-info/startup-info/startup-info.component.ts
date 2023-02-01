import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { startup } from 'src/app/lib/interfaces/startup';
import { LoadingService } from 'src/app/lib/services/loading/loading.service';
import { CRUDService } from 'src/app/lib/services/storage/crud.service';
@Component({
  selector: 'app-startup-info',
  templateUrl: './startup-info.component.html',
  styleUrls: ['./startup-info.component.css'],
})
export class StartupInfoComponent implements OnInit, OnDestroy {
  startup$!: Observable<startup | undefined>;
  startupInfo?: startup;
  id!: string;
  destroy?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private CRUDservice: CRUDService,
    private router: Router,
    private loader:LoadingService
  ) {}

  ngOnInit() {
      this.loader.show();
    this.startup$ = this.route.paramMap.pipe(
      switchMap((value) => {
        this.id = value.get('id') + '';
        return this.CRUDservice.getStartupById(this.id);
      })
    );
    this.startup$.subscribe((value) => {
      this.startupInfo = value;
       this.loader.hide();
    });
         

  }
  goBackToHome() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.destroy?.unsubscribe();
  }
}
