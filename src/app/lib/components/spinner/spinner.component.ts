import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  constructor(private router:Router){}


ngOnInit() :void{

  setTimeout(() => this.router.navigate(['/admin']), 1000);

}


}
