import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Movies } from '../interfaceclasses/movies';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movieurl: string = 'https://backend-crud-one.vercel.app/product'
  constructor(private http: HttpClient) { }
  // get movie
  get_movie_data() {
    return this.http.get<Movies[]>('https://backend-crud-one.vercel.app/product').pipe(
      catchError((error)=>{
        return throwError(()=>new Error(error))
      })
    )
    }
  get_movie_detail(id: string) {
    return this.http.get<Movies>(`https://backend-crud-one.vercel.app/product/${id}`).pipe(
      catchError((error)=>{
        return throwError(()=>new Error(error))
      })
    )
  }

}
