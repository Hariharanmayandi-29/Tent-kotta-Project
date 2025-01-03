import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../authservice/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_form = { email: '', password: '' }
  custom_error_password = ''
  custom_error_email = ''
  custom_error_unknown = ''
  loading = false
  login_status!: boolean
  constructor(private service: AuthService, private router: Router) { }
  login_submit(loginform: NgForm) {
    this.loading = true

    // Clear previous error messages
    this.custom_error_email = '';
    this.custom_error_password = '';
    this.custom_error_unknown = '';

    this.service.login(this.login_form.email, this.login_form.password).pipe(
      catchError((error) => {
        console.error('Error object in catchError:', error);


        return throwError(() => error);
      })
    ).subscribe({
      next: (data) => {
        this.service.store_token(data.idToken);
        console.log("Token stored:", data.idToken);
        this.loading = false;

        // for profile guard
        this.login_status = true
        this.service.store_token(data.idToken)
        this.service.setAuthenticationStatus(true)
        this.router.navigate(['/profile'])
        this.service.status = true
        console.log(data.idToken)

      },
      error: (error) => {
        console.error('Error object in subscribe:', error);
        this.custom_error_unknown="Invalid UserId Password,Try again"

        // Handle additional error logic in subscription
        if (error.error?.error?.message === "INVALID_PASSWORD") {


          this.custom_error_unknown = "Invalid Passwor and  Mail";
        }

        this.loading = false;
      }
    });
  }

}
