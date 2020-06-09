/**
 * Model Interface for the API Response
 * @export
 * @interface SelfRegisterState
 */
import { ApiErrors } from '../../errors/models/api.errors';

export interface SelfRegisterState {
  /**
   * languageButtonText
   * @type {String}
   * @memberOf SelfRegisterState
   */
  languageButtonText: string;

  /**
   * applicationLanguage
   * @type {String}
   * @memberOf SelfRegisterState
   */
  applicationLanguage: string;

  /**
   * showDialog
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  showDialog: boolean;

  /**
   * service Agreement Read
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  serviceAgreementRead: boolean;

  /**
   * accountDetailsPassed
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  accountDetailsPassed: boolean;

  /**
   * verificationPassed
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  verificationPassed: boolean;

  /**
   * emailPassed
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  emailPassed: boolean;

  /**
   * passwordPassed
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  passwordPassed: boolean;

  /**
   * fullScreenErrors
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  fullScreenErrors: boolean;

  /**
   * step1InlineError
   * @type {ApiErrors}
   * @memberOf SelfRegisterState
   */
  step1InlineError: ApiErrors;

  /**
   * step1Errors
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  step1Errors: boolean;

  /**
   * step2InlineError
   * @type {ApiErrors}
   * @memberOf SelfRegisterState
   */
  step2InlineError: ApiErrors;

  /**
   * step2Errors
   * @type {Array}
   * @memberOf SelfRegisterState
   */
  step2Errors: boolean;

  /**
   * step3InlineError
   * @type {ApiErrors}
   * @memberOf SelfRegisterState
   */
  step3InlineError: ApiErrors;
  /**
   * step3Errors
   * @type {Array}
   * @memberOf SelfRegisterState
   */
  step3Errors: boolean;

  /**
   * Confirmation Error
   * @type {Array}
   * @memberOf SelfRegisterState
   */
  confirmationErrors: boolean;

  /**
   * currentStep
   * @type {number}
   * @memberOf SelfRegisterState
   */
  currentStep: number;

  /**
   * account_number
   * @type {string}
   * @memberOf SelfRegisterState
   */
  account_number: string;

  /**
   * customer email address
   * @type {string}
   * @memberOf SelfRegisterState
   */
  customer_email: string;

  /**
   * server call loading
   * @type {boolean}
   * @memberOf SelfRegisterState
   */
  loading: boolean;

  /**
   * identification page question
   * @type {string}
   * @memberOf SelfRegisterState
   */
  // TODO is this an array of strings?
  verificationQuestions: string;
}
