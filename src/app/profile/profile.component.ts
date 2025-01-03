import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_data = { localId: "", displayName: "", email: "" }

  constructor(private service: AuthService) {

  }
  ngOnInit(): void {
    this.service.details().pipe(catchError((error) => {
      return throwError(() => new Error(error))
    })).subscribe(data => {
      this.user_data.localId = data.users[0].localId
      this.user_data.displayName = data.users[0].displayName
      this.user_data.email = data.users[0].email
      console.log(this.user_data)
    })
  }

  logout(){
    this.service.logout()
  }
}
