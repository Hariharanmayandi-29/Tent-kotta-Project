import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../interfaceclasses/movies';
import { MoviesService } from '../service/movies.service';
import { Confirmmovies } from '../interfaceclasses/confirmmovies';
import { catchError } from 'rxjs';
import { of } from 'rxjs'
import { AuthService } from '../authservice/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  id!: string
  movies!: Movies | null
  price_per_movie!: number
  total_movie: number = 0
  total_price: number = 0
  tax: number = 0
  charges: number = 0
  total_amnt: number = 0
  discount: number = 0
  image: string | undefined
  movie_name!: string
  purchase_details!: Confirmmovies
  purchase_ordertoggle = false
  purchase_disable = false

  error_message = false
  loading = true

  // loged in
  authenticated!:boolean

  // ispurchase togle
  purchasetoggle: boolean = false
  constructor(private activaterouter: ActivatedRoute, private service: MoviesService, private auth: AuthService) {

  }
  ngOnInit(): void {
    this.fetch_movie_detail()
    this.auth.getAuthenticationStatus().subscribe(
      data=>{this.authenticated=data}
    )


  }
  fetch_movie_detail() {
    this.id = this.activaterouter.snapshot.params['id']
    this.service.get_movie_detail(this.id).pipe(catchError((error) => {
      this.loading = false
      this.error_message = true
      return of(null)
    })).subscribe(data => {
      this.loading = false

      if (data) {
        this.movies = data
        this.price_per_movie = data.ticketprice
        this.image = data.image
        this.movie_name = data.name
        this.error_message = false
      }

    })
  }

  increase_movie() {
    if (this.total_movie >= 0) {
      this.total_movie++
      this.total_movie_price()
    }


  }
  decrease_movie() {
    if (this.total_movie > 0) {
      this.total_movie -= 1
      this.total_movie_price()
    }
  }
  // total movie price
  total_movie_price() {
    this.total_price = this.total_movie * this.price_per_movie
    this.tax_charges()
    this.total_charges()
    if (this.authenticated) {
      this.total_discount()
    }
    this.total_amount()
    this.image_insert()
    this.purchase_disable_fn()
  }
  // purchase_disable function
  purchase_disable_fn() {
    if (this.total_movie > 0) {
      this.purchase_disable = true
    }
    else {
      this.purchase_disable = false
    }
  }
  // tax %
  tax_charges() {
    this.tax = this.total_price * 7 / 100
  }
  // charges
  total_charges() {
    if (this.total_movie > 4) {
      this.charges = 30 * this.total_movie
    }
    else if (this.total_movie > 2 && this.total_movie <= 4) {
      this.charges = 35 * this.total_movie
    }

    else {
      this.charges = 50 * this.total_movie
    }
  }
  // Dicount
  total_discount() {
    this.discount = (this.price_per_movie * 5 / 100) * this.total_movie
  }
  // Total Amount
  total_amount() {
    this.total_amnt = this.total_price + this.charges + this.discount + this.tax
  }
  // purchase toggle
  purchase_toggle() {
    this.purchasetoggle = !this.purchasetoggle
  }
  // Discard purchase
  discard_purchase() {
    this.total_movie = 0;
    this.total_price = 0;
    this.tax = 0;
    this.charges = 0;
    this.total_amnt = 0;
    this.discount = 0;
    this.image = undefined
  }
  image_insert() {
    if (this.movies) {
      this.image = this.movies.image
    }
  }
  // purchase confirm
  purchase_confirm() {
    this.purchase_details = { total_movie: this.total_movie, total_price: this.total_price, tax: this.tax, charges: this.charges, total_amnt: this.total_amnt, discount: this.discount, image: this.image, movie_name: this.movie_name }
    console.log(this.purchase_details)
  }

  // purschaseorder toggle
  purchase_order_toggle() {
    this.purchase_ordertoggle = !this.purchase_ordertoggle
  }
  goback_purchase() {
    this.purchase_ordertoggle = !this.purchase_ordertoggle
  }

}
