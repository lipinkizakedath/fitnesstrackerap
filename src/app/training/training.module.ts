import { NgModule } from '@angular/core';
import { TrainingComponent } from '../training/training.component';
import { CurrentTrainingComponent } from '../training/current-training/current-training.component';
import { NewTrainingComponent } from '../training/new-training/new-training.component';
import { PastTrainingsComponent } from '../training/past-trainings/past-trainings.component';
import { StoptrainingComponent } from '../training/current-training/stoptraining/stoptraining.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';


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
    TrainingRoutingModule,
    // since its a lazy loading module we have to add it in this way, we cannot add this reducer to the app.reducer
    StoreModule.forFeature('training', trainingReducer), // this is for the lazy loading
  ],

  exports: [],
  entryComponents: [StoptrainingComponent],
})
export class TrainingModule { }
