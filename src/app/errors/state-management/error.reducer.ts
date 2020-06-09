import {Action, createReducer, on} from '@ngrx/store';
import { ErrorState} from './error.models';
import * as errorActions from './error.actions';

export const initialState: ErrorState = {
  errorList: {
    level: 0,
    message: '',
    type: 0,
    statusCode : ''
  }
};


const errorReducer = createReducer(
  initialState,
  on(errorActions.processError, (state, {payload}) => ({...state, errorList: payload})),
  on(errorActions.clearErrorRequested, (state) => ({...state, initialState})),
);

export function reducer(state: ErrorState | undefined, action: Action) {
  return errorReducer(state, action);
}
