import { Route, Routes, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  status: boolean = false
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {
    this.setAuthenticationStatus(this.isAuthenticated())
  }

  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated$.next(status);
    if (status) {
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      sessionStorage.removeItem('isLoggedIn');
    }
  }


  getAuthenticationStatus(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }


  logout() {
    sessionStorage.removeItem('token')
    this.isAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }





  // calling register api from fire base
  is_register(name: string, email: string, password: string) {
    return this.http.post<{ idToken: string }>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_pCQLzSznI3dVw5UflHLWKt237VIEFJ0', { displayName: name, email, password })
  }

  // storing token
  store_token(idToken: string) {
    sessionStorage.setItem('token', idToken)
  }

  // for login api
  login(email: string, password: string) {

    return this.http.post<{ idToken: string }>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
AIzaSyB_pCQLzSznI3dVw5UflHLWKt237VIEFJ0`, { email, password })

  }

  // user details
  details() {
    const token = sessionStorage.getItem('token');


    return this.http.post<{ users: Array<{ localId: string, displayName: string, email: string }> }>(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_pCQLzSznI3dVw5UflHLWKt237VIEFJ0`,
      { idToken: token }
    );
  }




  // login status for profile guard
  login_status() {
    return this.status
  }
  login_status_for_guard(status: boolean) {
    this.status = status
  }
}
