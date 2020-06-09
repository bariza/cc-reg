import { Injectable } from '@angular/core';
import {Effect, Actions, ofType, createEffect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as ACTION_TYPES from '../actions/constants/self.register.constants';
import * as selfRegActions from '../actions/self.register.actions';
import {SelfRegisterService} from '../../services/self.register.serivce';

/**
 * Effect for DEPM SelfRegister
 * @export
 * @class SelfRegEffects
 */
@Injectable()
export class SelfRegEffects {
  /**
   * Effect that get triggered when employee submits on welcome
   * page. This doesn't fire an action as we are not storing whether
   * an employee accepted the disclaimer or not.
   * @memberOf SelfRegEffects
   */
  @Effect({ dispatch: false }) welcomeSubmitted = this.actions$.pipe(
    ofType(ACTION_TYPES.WELCOME_SUBMITTED),
    map(() => {
      this.router.navigate(['account-details']);
    }));

  /**
   * Effect that handles the SUBMIT_EMAil_START action.
   * Upon receiving this action email address is submitted
   * and the result is handled via appropriate actions
   * @memberOf SelfRegEffects
   */
  // TODO add generic action interface
  @Effect() accountDetails = this.actions$.pipe(
    ofType<{type: string, payload: any}>(ACTION_TYPES.ACCOUNT_DETAILS_SUBMIT_STARTED),
    switchMap((action) => this.selfRegisterService.submitAccountDetails(action.payload)
      .pipe(
        map(payload => {
        this.router.navigateByUrl('identification');
        return selfRegActions.accountDetailsSubmitSucceeded({payload});
      }),
      catchError((error) => of(selfRegActions.accountDetailsSubmitFailed({payload: error})))
      )
    )
  );

  @Effect() identification = this.actions$.pipe(
    ofType<{type: string, payload: any}>(ACTION_TYPES.IDENTIFICATION_SUBMIT_STARTED),
    switchMap((action) => this.selfRegisterService.submitIdentification(action.payload)
      .pipe(
        map(payload => {
        this.router.navigateByUrl('password');
        return selfRegActions.identificationSubmitSucceeded({payload});
      }),
      catchError((error) => of(selfRegActions.identificationSubmitFailed({payload: error})))
      )
    )
  );

  /**
   * Effect that handles the PASSWORD_SUBMIT_STARTED action.
   * Upon receiving this action email address is submitted
   * and the result is handled via appropriate actions
   * @memberOf SelfRegEffects
   */
  // TODO add generic action interface
  @Effect() password = this.actions$.pipe(
    ofType<{type: string, payload: any}>(ACTION_TYPES.PASSWORD_SUBMIT_STARTED),
    switchMap((action) => this.selfRegisterService.submitPassword(action.payload)
      .pipe(
        map(payload => {
        this.router.navigateByUrl('confirmation');
        return selfRegActions.passwordSubmitSucceeded({payload});
      }),
      catchError((error) => of(selfRegActions.passwordSubmitFailed({payload: error})))
      )
    )
  );

  /**
   * Effect that handles the CONFIRMATION_SUBMIT_STARTED action.
   * @memberOf SelfRegEffects
   */
  @Effect() confirmation = this.actions$.pipe(
    ofType<{type: string, data: any}>(ACTION_TYPES.CONFIRMATION_SUBMIT_STARTED),
    switchMap((action) => this.selfRegisterService.submitConfirmation(action.data, false)
      .pipe(
        map(payload => {
          // TODO go to where？
          // this.router.navigateByUrl('confirmation');
          return selfRegActions.confirmationSucceeded({payload});
        }),
        catchError((error) => of(selfRegActions.confirmationFailed({payload: error})))
      )
    )
  );

  /**
   *   Creates an instance of SelfRegEffects
   * @param {Actions} actions$ the ngrx actions
   * @param {Router} router the router instance
   * @param {SelfRegisterService} selfRegisterService SelfRegister Service that encapsulates all the network calls
   */
  constructor(private actions$: Actions,
              private router: Router,
              private selfRegisterService: SelfRegisterService) {
  }

}
