import { Action } from '@ngrx/store';
import { Exercise } from '../models/Exercise';

export const SET_AVAILABLE_EXERCISES = '[Training] Set Available Exercises';
export const SET_FINISNED_EXERCISES = '[Training] Set Finished Exercises';
export const START_NEW_EXERCISE = '[Training] Start New Exercise';
export const STOP_EXERCISE = '[Training] Stop Exercise';

export class SetAvailableExercises implements Action {

    readonly type = SET_AVAILABLE_EXERCISES;

    constructor(public payload: Exercise[]) { }
}

export class SetFisnihedExercises implements Action {

    readonly type = SET_FINISNED_EXERCISES;

    constructor(public payload: Exercise[]) { }
}

export class StartTraining implements Action {

    readonly type = START_NEW_EXERCISE;

    constructor(public payload: string) { }
}

export class StopTraining implements Action {

    readonly type = STOP_EXERCISE;

}

export type TrainingActions = SetAvailableExercises | SetFisnihedExercises | StartTraining | StopTraining;



