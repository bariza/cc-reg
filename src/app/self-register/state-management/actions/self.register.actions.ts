
import { Action, props, createAction } from '@ngrx/store';

import * as CONSTANTS from './constants/self.register.constants';

/**
 * Resets the state
 * @returns {Action} action for handling reset state with self register
 */
export const resetState = createAction(CONSTANTS.RESET_STATE_REQUESTED);

/**
 * Sets the language
 * @param {string} btnLang language of the button
 * @param {string} appLang language of the application
 * @returns {Action} action for handling set language with self register
 */
export const setLanguage = createAction(CONSTANTS.SET_LANGUAGE_REQUESTED, props<{ btnLang: string, appLang: string }>());

// TODO add JSDoc for all actions
export const welcomeSubmitted = createAction(CONSTANTS.WELCOME_SUBMITTED);

export const accountDetailsSubmitStarted = createAction(CONSTANTS.ACCOUNT_DETAILS_SUBMIT_STARTED, props<{payload: any}>());

export const accountDetailsSubmitSucceeded = createAction(CONSTANTS.ACCOUNT_DETAILS_SUBMIT_SUCCEEDED, props<{payload: any}>());

export const accountDetailsSubmitFailed = createAction(CONSTANTS.ACCOUNT_DETAILS_SUBMIT_FAILED, props<{ payload: any }>());

export const identificationSubmitStarted = createAction(CONSTANTS.IDENTIFICATION_SUBMIT_STARTED, props<{payload: any}>());

export const identificationSubmitSucceeded = createAction(CONSTANTS.IDENTIFICATION_SUBMIT_SUCCEEDED, props<{payload: any}>());

export const identificationSubmitFailed = createAction(CONSTANTS.IDENTIFICATION_SUBMIT_FAILED, props<{ payload: any }>());

export const passwordSubmitStarted = createAction(CONSTANTS.PASSWORD_SUBMIT_STARTED, props<{payload: any}>());

export const passwordSubmitSucceeded = createAction(CONSTANTS.PASSWORD_SUBMIT_SUCCEEDED, props<{payload: any}>());

export const passwordSubmitFailed = createAction(CONSTANTS.PASSWORD_SUBMIT_FAILED, props<{ payload: any }>());

export const confirmationSubmitStarted = createAction(CONSTANTS.CONFIRMATION_SUBMIT_STARTED);

export const confirmationSucceeded = createAction(CONSTANTS.CONFIRMATION_SUBMIT__SUCCEEDED, props<{payload: any}>());

export const confirmationFailed = createAction(CONSTANTS.CONFIRMATION_SUBMIT__FAILED, props<{ payload: any }>());
