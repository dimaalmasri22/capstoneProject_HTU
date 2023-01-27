import {  Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { LoadingService } from 'src/app/lib/services/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loading: LoadingService,
    
  ) {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    this.auth
      .signIn(this.email?.value + '', this.password?.value + '')
      .then(() => {
          
        //navigate to admin/
        this.router.navigate(['/admin']);
      })
      .catch((error) => {
        alert('Invalid Login Please Try Again');
        this.loading.hide();
      });
  }
}
