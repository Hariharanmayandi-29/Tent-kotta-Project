import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Movies } from '../interfaceclasses/movies';
import { catchError, pipe, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SearchInputService } from '../service/search-input.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  movies_data!: Movies[]
  filtered_movie: Movies[]=[]
  ishomeactive: boolean = false
  private movie_subcription!: Subscription
  private search_subcription!: Subscription
  error_message!: string
  is_error_message:boolean=false

  constructor(private service: MoviesService, private route: Router, private search_service: SearchInputService) { }
  ngOnInit(): void {
    this.rec_movies()
    this.search_subcription = this.search_service.observable.subscribe(search_value => {
      this.filtered_movie = this.filter_movie_search(search_value)
    })
  }
  navigate_movies_details(id: string) {
    this.route.navigate(['/moviedetail', id])
  }

  rec_movies() {
    this.movie_subcription = this.service.get_movie_data().pipe(
      catchError((error)=>{
        this.error_message=error
        this.is_error_message=true
        return []
        
      })
    ).subscribe((data) => {
      this.movies_data = data;
      this.filtered_movie = data;
      this.is_error_message=false
    });
  }
  
  
  filter_movie_search(search_value: string) {
      if(!search_value) {
        return this.movies_data
      }

    const filteredmovie = this.movies_data.filter((movie) => {
        return movie.name.toLowerCase().includes(search_value.toLocaleLowerCase())
      })
    return filteredmovie.length > 0 ? filteredmovie : []

    }



  ngOnDestroy(): void {
      this.movie_subcription.unsubscribe()
    this.search_subcription.unsubscribe()

    }


}
