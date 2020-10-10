import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Exercise } from '../models/Exercise';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from './ui.service';
import * as fromTraining from '../training/training.reducer';
import * as Training from '../training/training.actions';
import * as UI from '../shared/ui.action';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private firebaseSubscription: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>) { }

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
        this.store.dispatch(new Training.SetAvailableExercises(exercise));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnakbar(error.message, null, 2000);
      }
      ));
  }

  startExercise(exerciseId: string) {
    this.store.dispatch(new Training.StartTraining(exerciseId));
  }


  completeExercise(): void {
    this.store.select(fromTraining.getActiveTaining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
    });
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number): void {
    this.store.select(fromTraining.getActiveTaining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchCompletedOrCancelledExercises(): void {
    this.firebaseSubscription.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe((exercise: Exercise[]) => {
        this.store.dispatch(new Training.SetFisnihedExercises(exercise));
      }));
  }

  cancelSubsriptions(): void {
    this.firebaseSubscription.forEach(sub => sub.unsubscribe());
  }

  addDataToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }

}
