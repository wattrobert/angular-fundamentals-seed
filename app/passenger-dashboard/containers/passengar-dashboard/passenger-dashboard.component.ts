import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['./passenger-dashboard.component.scss'],
  template: `
    <div>
      <passenger-count [items]="passengers"></passenger-count>
      <passenger-detail 
        *ngFor="let passenger of passengers;" 
        [detail]="passenger" 
        (edit)="handleEdit($event)" 
        (view)="handleView($event)" 
        (remove)="handleRemove($event)">
      </passenger-detail>
    </div>
  `,
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => (this.passengers = data));
  }

  handleEdit(event) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id == event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }

  handleRemove(event: Passenger) {
    this.passengerService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id != event.id;
        });
      });
  }

  handleView(event: Passenger) {
    this.router.navigate(['/passengers', event.id]);
  }
}
