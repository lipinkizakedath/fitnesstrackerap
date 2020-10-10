import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/Services/Training.service';
import { StoptrainingComponent } from './stoptraining/stoptraining.component';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.store.select(fromTraining.getActiveTaining).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    }, error => { console.log(error); });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StoptrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }

}
