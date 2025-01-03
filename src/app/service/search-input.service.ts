import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchInputService {
  private subject = new BehaviorSubject<string>('')
  observable = this.subject.asObservable()
  constructor() { }
  update_search(value: string) {
    this.subject.next(value)
  }

}
