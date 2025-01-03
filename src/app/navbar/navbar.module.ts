import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { OrderbadgeComponent } from '../orderbadge/orderbadge.component'; // Ensure the path is correct
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    OrderbadgeComponent // Add OrderbadgeComponent here
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
