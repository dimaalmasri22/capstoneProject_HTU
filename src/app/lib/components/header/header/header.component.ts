import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  toggle?: boolean = false;
  navbars?: boolean = false;
  constructor(private router: Router) {}
  OpenMenu() {
    if (!this.toggle) {
      this.toggle = true;
    
    } else {
      this.toggle = false;
     
    }
     if (!this.navbars) {
       this.navbars = true;
      
     } else {
       this.navbars = false;
       
     }
  }
  navigateHome() {
    this.toggle = false;
        this.navbars = false;

    this.router.navigate(['/']);
  }
  navigateAbout() {
    this.toggle = false;
    this.navbars = false;
    this.router.navigate(['/about']);
  }

  navigateFaq() {
    this.toggle = false;
        this.navbars = false;

    this.router.navigate(['/FAQ']);
  }
  navigateAddStartup() {
    this.toggle = false;
        this.navbars = false;

    this.router.navigate(['/addRequest']);
  }
  navigateLogin() {
    this.toggle = false;
        this.navbars = false;

    this.router.navigate(['/auth']);
  }
}
