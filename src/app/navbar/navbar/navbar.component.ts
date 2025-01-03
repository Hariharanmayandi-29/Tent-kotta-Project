import { OrderbadgeService } from './../../service/orderbadge.service';
import { OrderbadgeComponent } from './../../orderbadge/orderbadge.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authservice/auth.service';
import { SearchInputService } from 'src/app/service/search-input.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ishomeactive: boolean = true
  iscontactactive: boolean = false
  isloginactive: boolean = false
  isbooking: boolean = false
  searchValue :string=''
  // behavior subject for search
  isAuthenticated$=false;
  // order badge
  is_orderbadge_on=false

  constructor(public auth:AuthService,private service: SearchInputService,private router:Router,private badge:OrderbadgeService) { 
    
  }
  
  ngOnInit(): void {
    // Reset search value on every route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.searchValue = ''; // Clear the input field's value
        this.service.update_search(''); // Clear the search service value
        
      }
      this.auth.getAuthenticationStatus().subscribe(data=>{
        this.isAuthenticated$ = data
      });
    });

    // order badge on of
    this.badge.obs.subscribe(data=>{
      this.is_orderbadge_on=data
    })
    
  }

  // login logout condition


  

  update_search(val: string) {
    this.service.update_search((val))
    console.log(val)
  }

  is_home_active() {
    this.ishomeactive = true
    this.iscontactactive = false
    this.isloginactive = false
    this.isbooking = false
  }
  is_contact_active() {
    this.ishomeactive = false
    this.iscontactactive = true
    this.isloginactive = false
    this.isbooking = false
  }
  is_login_active() {
    this.ishomeactive = false
    this.iscontactactive = false
    this.isloginactive = true
    this.isbooking = false
  }
  is_booking_active() {
    this.ishomeactive = false
    this.iscontactactive = false
    this.isloginactive = false
    this.isbooking = true
  }




}
