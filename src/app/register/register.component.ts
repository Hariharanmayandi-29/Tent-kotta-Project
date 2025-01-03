import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { confirmpassword } from '../validationerror/confirm-validation';
import { AuthService } from '../authservice/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user_data!: { username: string, email: string, password: string, dob: string, mobile: string }
  custom_error!:string
  registered=false
  loader:boolean=false
  constructor(private auth: AuthService) { }

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/), Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required])
  }, { validators: confirmpassword() })


  onSubmit() {
    if (this.registrationForm.valid) {
      this.user_data = {
        username: this.registrationForm.value.username!,
        email: this.registrationForm.value.email!,
        password: this.registrationForm.value.password!,
        dob: this.registrationForm.value.dob!,
        mobile: this.registrationForm.value.mobile!,
      }
    }
    this.loader=true
    this.auth.is_register(this.user_data.username, this.user_data.email, this.user_data.password).pipe(
      catchError((error)=>{
        this.loader=false
        return throwError(()=>
          {
            if (error.error?.error?.message === 'INVALID_EMAIL') {
              this.custom_error='INVALID_EMAIL'
            }if (error.error?.error?.message === 'EMAIL_EXISTS') {
              this.custom_error='Already You have a account'
            }
             else {
              this.custom_error='Unknown error occured while registering';
            }
          })
      })
    )
    .subscribe(
     
      (data)=>{
        
        this.registered=true
        this.auth.navigateToLogin()
        this.loader=false
        
      }
    )

  }
  // getting the validation
  get username() {
    return this.registrationForm.get('username')
  }
  get email() {
    return this.registrationForm.get('email')
  }
  get password() {
    return this.registrationForm.get('password')
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')
  }
  get dob() {
    return this.registrationForm.get('dob')
  }
  get mobile() {
    return this.registrationForm.get('mobile')
  }
}

