import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MoviesService } from '../service/movies.service';
import { Movies } from '../interfaceclasses/movies';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  movies:Movies[]=[]
  constructor(private service:MoviesService){

  }
  ngOnInit(): void {
    this.service.get_movie_data().subscribe(data=>{
      this.movies=data
    })
  }

  onSubmit(contactform:NgForm) { }
}
