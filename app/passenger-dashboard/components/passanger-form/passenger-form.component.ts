import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      <div>
        Passenger ID:
        <input
          type="number" 
          name="id" 
          required
          #id="ngModel"
          [ngModel]="detail?.id">
        <div *ngIf="id.errors?.required && id.dirty" class="error">
          Passenger ID is required
        </div>
      </div>
      <div>
        Passenger name:
        <input
          type="text" 
          name="fullname"
          #fullname="ngModel"
          required
          [ngModel]="detail?.fullname">
        <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
          Passenger name is required
        </div>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            [value]="true" 
            name="checkedIn" 
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)">
            Checked In
        </label>
      </div>
      <div *ngIf="form.value.checkedIn">
        Check in date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkInDate">
      </div>
      <div>
        Luggage:
        <select 
          name="baggage"
          [ngModel]="detail?.baggage">
          <option
            [value]="item.key"
            [selected]="item.key === detail?.baggage"
            *ngFor="let item of baggage">
            {{item.value}}
          </option>
        </select>
      </div>
      <button type="submit" [disabled]="form.invalid">
        Update Passenger
      </button>
    </form>
  `,
})
export class PassengerFormComponent {
  @Input() detail: Passenger;
  @Output() update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: 'none',
      value: 'No Baggage',
    },
    {
      key: 'carry',
      value: 'Carry-on Baggage',
    },
    {
      key: 'checked',
      value: 'Checked Baggage',
    },
    {
      key: 'checked-carry',
      value: 'Carry-on and Checked Baggage',
    },
  ];

  toggleCheckIn(checkedIn: boolean) {
    this.detail.checkInDate = checkedIn ? Date.now() : null;
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      this.update.emit(passenger);
    }
  }
}
