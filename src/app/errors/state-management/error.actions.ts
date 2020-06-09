import {Action, props, createAction} from '@ngrx/store';
import { StepPosition } from './error.effects';

/**
 * The error types
 */
export const Types = {
    PROCESS_ERROR_REQUESTED: 'PROCESS_ERROR',
    CLEAR_ERROR_REQUESTED: 'CLEAR_ERROR_REQUESTED',
    SEND_ONPAGE_ERROR: 'SEND_ONPAGE_ERROR',
    SEND_FULLPAGE_ERROR: 'SEND_FULLPAGE_ERROR',
    FULL_PAGE_ERROR_TRIGGERED: 'SEND_FULLPAGE_ERROR',
    ON_PAGE_ERROR_TRIGGERED: 'SEND_ONPAGE_ERROR',
    PROCESS_ERROR: 'PROCESS_ERROR',
    TIMEOUT_ERROR_TRIGGERED: 'TIMEOUT_ERROR',
  };

/**
 * Process error action creator
 * @param {Array<any>} errorList the error list
 * @returns {Action} the process error action
 */
export const sendOnPageError = createAction(Types.ON_PAGE_ERROR_TRIGGERED, props<{ stepPosition:StepPosition,payload: any }>());

/**
 * Process error action creator
 * @param {Array<any>} errorList the error list
 * @returns {Action} the process error action
 */
export const processError = createAction(Types.PROCESS_ERROR_REQUESTED, props<{ payload: any }>());

/**
 * Process error action creator
 * @param {Array<any>} errorList the error list
 * @returns {Action} the process error action
 */
export const sendFullPageError = createAction(Types.FULL_PAGE_ERROR_TRIGGERED);

/**
 * Clear error action creator
 */
export const clearErrorRequested = createAction(Types.CLEAR_ERROR_REQUESTED);

