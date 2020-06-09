import {createSelector} from '@ngrx/store';
import {ErrorState} from './error.models';


export const selectErrorState = state => state.errorState;

export const getErrorState = createSelector(
  selectErrorState,
  (errorState: ErrorState) => errorState
);
