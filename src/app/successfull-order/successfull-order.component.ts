import { Component, Input } from '@angular/core';
import { Confirmmovies } from '../interfaceclasses/confirmmovies';

@Component({
  selector: 'app-successfull-order',
  templateUrl: './successfull-order.component.html',
  styleUrls: ['./successfull-order.component.css']
})
export class SuccessfullOrderComponent {
@Input()movies_from_purchase!:Confirmmovies
}
