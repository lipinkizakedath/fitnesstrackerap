import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/models/Exercise';
import { TrainingService } from '../../Services/Training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  ExcerciseList: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = false;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.isLoading = true;
    delay(3000);
    this.exerciseSubscription = this.trainingService.ExercisesChagned.subscribe(
      exercises => { this.ExcerciseList = exercises; this.isLoading = false;}
    );
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }


  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseId);
  }

}
