import { NgModule } from '@angular/core';
import { TrainingComponent } from '../training/training.component';
import { CurrentTrainingComponent } from '../training/current-training/current-training.component';
import { NewTrainingComponent } from '../training/new-training/new-training.component';
import { PastTrainingsComponent } from '../training/past-trainings/past-trainings.component';
import { StoptrainingComponent } from '../training/current-training/stoptraining/stoptraining.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StoptrainingComponent
  ],

  imports: [
    SharedModule,
    TrainingRoutingModule
  ],

  exports: [],

  entryComponents: [
    StoptrainingComponent
  ],
})
export class TrainingModule { }
