import {Injectable, Type} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as errorActions from './error.actions';
import * as ACTION_TYPES from '../../self-register/state-management/actions/constants/self.register.constants';
import { getErrordetails } from '../../../common/helpers/helpers';
import { Observable } from 'rxjs/Observable';
import { SelfRegisterService } from '../../self-register/services/self.register.serivce';
import {
  accountDetailsSubmitFailed, confirmationFailed, passwordSubmitFailed,
  identificationSubmitFailed
} from '../../self-register/state-management/actions/self.register.actions';
import {Action} from '@ngrx/store';
import {ActionWithPayload} from '../../../common/models/app.models';
import {Router} from '@angular/router';
import {Types} from './error.actions';
// import { TimeoutDialogService } from '../../../common/services/timeout-popup.service';

export type StepPosition = 1 | 2 | 3 ;
/**
 * Effect for the errors
 * @export
 * @class ErrorEffects
 */
@Injectable()
export class ErrorEffects {

  /**
   * Mapping for the SUBMIT_STEP1_FAIL actions
   * @memberOf ErrorEffects
   */
  @Effect() serverErrorEffect = this.actions$.pipe(
    // TODO: need to ensure which kind of errors we need here
    ofType<{type: string, payload: any}>(accountDetailsSubmitFailed),
    map(action => action.payload),
    map(payload => this.handleServerError(payload,1))
  );


  /**
   * Mapping for the SUBMIT_STEP2_FAIL actions
   * @memberOf ErrorEffects
   */
  @Effect() serverIdentificationErrorEffect = this.actions$.pipe(
    // TODO: need to ensure which kind of errors we need here
    ofType<{type: string, payload: any}>(identificationSubmitFailed,
      passwordSubmitFailed,
      confirmationFailed),
    map(action => action.payload),
    map(payload => this.handleServerError(payload,2))
  );

  /**
   * Mapping for the SUBMIT_STEP3_FAIL actions
   * @memberOf ErrorEffects
   */
  @Effect() passwordErrorEffect = this.actions$.pipe(
    // TODO: need to ensure which kind of errors we need here
    ofType<{type: string, payload: any}>(passwordSubmitFailed),
    map(action => action.payload),
    map(payload => this.handleServerError(payload,3))
  );
  /**
   * Mapping for the SUBMIT_STEPX_FAIL actions
   * @memberOf ErrorEffects
   */
  @Effect() timeoutErrorEffect = this.actions$.pipe(
    ofType(Types.TIMEOUT_ERROR_TRIGGERED),
    map(payload => this.handleServerError({
      status: '500',
      statusText: 'Timeout Error',
      code: '4008'
    }))
  );

  @Effect({dispatch: false}) processErrors = this.actions$.pipe(
    ofType<ActionWithPayload>(Types.PROCESS_ERROR_REQUESTED),
    map(action => action.payload),
    map(payload => this.router.navigateByUrl('error'))
  );

  /**
   * Creates an instance of ErrorEffects.
   * @param {Actions} actions$ the ngrx actions
   * @param {ErrorActions} errorActions the error action creator
   * @param {SelfRegisterService} service the self register service
   * @param {TimeoutDialogService} timeoutService the timeout service
   * @returns {void}
   * @memberOf ErrorEffects
   */
  constructor(
    private actions$: Actions,
    // private errorActions: ErrorActions,
    private service: SelfRegisterService,
    // private timeoutService: TimeoutDialogService,
    private router: Router
  ) {}

  /**
   * Handler for the process error
   * @param {any} errorList the error list
   * @returns {Observable<Action>} observable for the process error action
   * @memberOf ErrorEffects
   */
  handleServerError(errorList: any,stepPosition?:StepPosition) {
    if (getErrordetails(errorList.code).type === 'ONPAGE') {
      return errorActions.sendOnPageError({stepPosition:stepPosition,payload: errorList});
    }
    // kill server session for any FULL PAGE error
    // this.timeoutService.stopTimer();
    // this.service.terminateSession().subscribe();
    return errorActions.processError({payload: errorList});
  }
}
