import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/models/Exercise';
import { TrainingService } from '../../Services/Training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  excerciseList$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.excerciseList$ = this.store.select(fromTraining.getAvailableExercises);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseId);
  }

}
