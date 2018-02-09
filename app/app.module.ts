import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PassengerDashboardModule } from './passenger-dashboard/passenger-dashboard.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'passengers',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    //angular modules
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),

    //custom modules
    PassengerDashboardModule,
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
})
export class AppModule {}
