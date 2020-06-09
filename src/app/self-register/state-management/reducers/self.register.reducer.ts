import {createReducer, on, Action} from '@ngrx/store';
import * as selfRegActions from '../actions/self.register.actions';
import * as errorActions from 'src/app/errors/state-management/error.actions';
import {SelfRegisterState} from '../../models';

const initialState: SelfRegisterState = {
  languageButtonText: 'Français',
  applicationLanguage: 'en',
  showDialog: false,
  serviceAgreementRead: false,
  accountDetailsPassed: false,
  verificationPassed: false,
  emailPassed: false,
  passwordPassed: false,
  fullScreenErrors: false,
  step1Errors: false,
  step1InlineError: {
    status: '',
    statusText: '',
    code: ''
  },
  step2Errors: false,
  step2InlineError: {
    status: '',
    statusText: '',
    code: ''
  },
  step3Errors: false,
  step3InlineError: {
    status: '',
    statusText: '',
    code: ''
  },
  confirmationErrors: false,
  currentStep: 0,
  account_number: null,
  customer_email: null,
  loading: false,
  verificationQuestions: null,
};

const selfRegReducer = createReducer(
  initialState,
  on(selfRegActions.resetState, state => ({
    ...state, showDialog: false,
    serviceAgreementRead: false,
    accountDetailsPassed: false,
    verificationQuestions: null,
    verificationPassed: false,
    emailPassed: false,
    passwordPassed: false,
    fullScreenErrors: false,
    step1Errors: false,
    step1InlineError: {
      status: '',
      statusText: '',
      code: ''
    },
    step2Errors: false,
    step2InlineError: {
      status: '',
      statusText: '',
      code: ''
    },
    step3Errors: false,
    step3InlineError: {
      status: '',
      statusText: '',
      code: ''
    },
    confirmationErrors: false,
    loading: false
  })),
  on(selfRegActions.accountDetailsSubmitStarted, selfRegActions.identificationSubmitStarted, selfRegActions.confirmationSubmitStarted, state => ({
    ...state,
    loading: true
  })),
  on(selfRegActions.welcomeSubmitted, state => ({...state, serviceAgreementRead: true})),
  on(selfRegActions.accountDetailsSubmitSucceeded, (state, {payload}) => ({
    ...state,
    accountDetailsPassed: true,
    loading: false,
    verificationQuestion: payload.challenges
  })),
  // TODO do we need a payload?
  on(selfRegActions.identificationSubmitSucceeded, (state) => ({
    ...state,
    verificationPassed: true,
    loading: false
  })),
  on(selfRegActions.passwordSubmitSucceeded, (state) => ({
    ...state,
    passwordPassed: true,
    loading: false
  })),
  // TODO add state for JLM
  on(selfRegActions.confirmationSucceeded, (state) => ({
    ...state,
    loading: false
  })),
  on(selfRegActions.accountDetailsSubmitFailed, (state) => ({
    ...state,
    loading: false
  })),
  on(selfRegActions.identificationSubmitFailed, (state,{payload}) => ({
    ...state,
    loading: false
  })),
  on(selfRegActions.passwordSubmitFailed, (state) => ({
    ...state,
    loading:false
  })),
  on(selfRegActions.confirmationFailed, (state) => ({
    ...state,
    confirmationErrors: true,
    loading: false
  })),
  on(errorActions.sendOnPageError, (state, {stepPosition,payload}) => ({
    ...state,
    [`step${stepPosition}Errors`]: true,
    [`step${stepPosition}InlineError`]: payload,
    loading: false
  })),
  on(selfRegActions.setLanguage, (state, {btnLang, appLang}) => ({
    ...state,
    languageButtonText: btnLang,
    applicationLanguage: appLang
  })),
);

export function reducer(state: SelfRegisterState | undefined, action: Action) {
  return selfRegReducer(state, action);
}

