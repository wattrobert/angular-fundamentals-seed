import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//containers
import { PassengerDashboardComponent } from './containers/passengar-dashboard/passenger-dashboard.component';

//components
import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';

//services
import { PassengerDashboardService } from './passenger-dashboard.service';
import { PassengerViewerComponent } from './containers/passenger-viewer/passenger-viewer.component';
import { PassengerFormComponent } from './components/passanger-form/passenger-form.component';

const routes: Routes = [
  {
    path: 'passengers',
    children: [
      {
        path: '',
        component: PassengerDashboardComponent,
      },
      {
        path: ':id',
        component: PassengerViewerComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    //containers
    PassengerDashboardComponent,
    PassengerViewerComponent,

    //components
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerFormComponent,
  ],
  imports: [
    //angular modules
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [PassengerDashboardService],
})
export class PassengerDashboardModule {}
