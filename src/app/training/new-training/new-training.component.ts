import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/models/Exercise';
import { TrainingService } from '../../Services/Training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.action';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  ExcerciseList: Exercise[];
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingService.ExercisesChagned.subscribe(
      exercises => {
        this.ExcerciseList = exercises;
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
      }
    );
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }


  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseId);
  }

}
