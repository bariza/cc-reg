import {FormControl, FormGroupDirective, NgForm, ValidationErrors} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/**
 * Custom error state matcher for text input
 *
 * @export
 *  CustomErrorStateMatcher
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {

  /**
   * Custom validation errors
   *
   * @memberof CustomErrorStateMatcher
   */
  validationErrors = [];

  /**
   * Creates an instance of CustomErrorStateMatcher.
   *  validationErrors customer validation errors
   * @memberof CustomErrorStateMatcher
   */
  constructor(validationErrors: ValidationErrors[]) {
    this.validationErrors = validationErrors;
  }

  /**
   * Implementation of isErrorState from the error state matcher
   *
   *  {FormControl} control form control
   * @returns
   * @memberof CustomErrorStateMatcher
   */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return ((control && control.invalid && control.touched) || isSubmitted) && this.getError(control);
  }

  /**
   * Check if error is in the list of custom validation errors
   *
   * @memberof CustomErrorStateMatcher
   */
  private getError(control: FormControl): boolean {
    const validationError = this.validationErrors.find(
      error => control.errors && control.errors[error.flag] || null
    );
    return !!validationError;
  }
}
