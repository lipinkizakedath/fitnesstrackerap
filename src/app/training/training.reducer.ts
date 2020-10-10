import { Exercise } from '../models/Exercise';
import * as fromRoot from '../app.reducer';
import { TrainingActions, SET_AVAILABLE_EXERCISES, SET_FINISNED_EXERCISES, START_NEW_EXERCISE, STOP_EXERCISE } from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    availableExercise: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercise: [],
    finishedExercises: [],
    activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {

    switch (action.type) {

        case SET_AVAILABLE_EXERCISES:
            return {
                ...state,
                availableExercise: action.payload
            };
        case SET_FINISNED_EXERCISES:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case START_NEW_EXERCISE:
            return {
                ...state,
                activeTraining: { ...state.availableExercise.find(ex => ex.id === action.payload )}
            };

        case STOP_EXERCISE:
            return {
                ...state,
                activeTraining: null
            };
        default: {
            return state;
        }
    }
}

// This is how we create selectors for lazy loaded modules states, instead of pulling the same from app.reducer
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercise);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTaining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTaining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);




