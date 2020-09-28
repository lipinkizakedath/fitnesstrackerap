import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeclomeComponent } from '../weclome/weclome.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { TrainingComponent } from '../training/training.component';

const routes: Routes = [

  { path: '', component: WeclomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent },


]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
