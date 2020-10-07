import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from '../models/Exercise';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from './ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  ExercisesChagned = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private firebaseSubscription: Subscription[] = [];

  private finishedExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private availableExercises: Exercise[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromRoot.State>) { }

  fetchAvailableExercises(): void {
    this.store.dispatch(new UI.StartLoading());
    this.firebaseSubscription.push(this.db.collection('availableExercises')
      .snapshotChanges().pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      })).subscribe((exercise: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.availableExercises = exercise;
        this.ExercisesChagned.next([...this.availableExercises]);
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnakbar(error.message, null, 2000);
      }
      ));
  }

  startExercise(exerciseId: string): void {
    this.runningExercise = this.availableExercises.find(x => x.id === exerciseId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise(): void {
    this.addDataToDatabase(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises(): void {
    this.firebaseSubscription.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe((exercise: Exercise[]) => {
        this.finishedExercisesChanged.next(exercise);
      }));
  }

  cancelSubsriptions(): void {
    this.firebaseSubscription.forEach(sub => sub.unsubscribe());
  }

  addDataToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }

}
