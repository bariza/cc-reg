import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, FormGroupDirective, ValidatorFn} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { CustomErrorStateMatcher } from "./text-input.error-matcher";
import { ValidationErrors } from "./text-input.interface";

export type TextCase = "uppercase" | "lowercase";

/**
 * Base UI component for text input field
 *
 * @export
 *  TextInputComponent
 */
@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TextInputComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  /**
   * Id for host element (used as target for testing/analytics)
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() id: string;

  /**
   * Placeholder (label) for text input
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() placeholder: string;

  /**
   * Flag to disable text input
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() disabled: boolean;

  /**
   * Minimum character restriction for input
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() minLength: number;

  /**
   * Maximum character restriction for input
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() maxLength: number;

  /**
   * Form control name for text input
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() controlName: string;

  /**
   * Parent form group with the text input form control
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() parentFormGroup: FormGroup;

  /**
   * Validators for parent form group
   */
  @Input() parentFormGroupValidators: ValidatorFn[];

  /**
   * Form validators for text input
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() validators: ValidatorFn[];

  /**
   * Type for input field
   *
   * @memberOf TextInputComponent
   */
  @Input() inputType = "text";

  /**
   * Hint text for input field
   *
   * @memberOf TextInputComponent
   */
  @Input() hintText = "";

  /**
   * List of form validation errors for text input
   *
   *
   * @memberOf TextInputComponent
   */
  @Input() validationErrors: ValidationErrors[];

  /**
   * Value bound to ngModel of the text input
   *
   * @memberOf TextInputComponent
   */
  @Input() value = "";

  /**
   * Aria role for input (used by dropdown, datepicker, searchbox)
   *
   * @memberOf TextInputComponent
   */
  @Input() ariaInputRole = "";

  /**
   * Allow only numbers for input field
   *
   * @memberOf TextInputComponent
   */
  @Input() allowOnlyNumbers = false;

  /**
   * Allow read-only field
   *
   * @memberOf TextInputComponent
   */
  @Input() readonly = false;

  /**
   * Show mat suffix content for input field
   *
   * @memberOf TextInputComponent
   */
  @Input() showMatSuffix = false;

  /**
   * Flag to wrap input text field (used for dropdown/datepicker)
   *
   * @memberOf TextInputComponent
   */
  @Input() wrapInputFieldText = false;

  /**
   * transform  - transformation of the input value
   * Eg., upperCase -> toUppercase(), lowerCase -> toLowerCase()
   *
   * @memberOf TextInputComponent
   */
  @Input() transform: TextCase;
  /**
   * Emit ngModel (input value) updates to parent component
   *
   *
   * @memberOf TextInputComponent
   */
  @Output() status: EventEmitter<string> = new EventEmitter();

  // required for currency input field

  /**
   * Emit updates when user blurs input field
   *
   *
   * @memberOf TextInputComponent
   */
  @Output() inputBlur: EventEmitter<string> = new EventEmitter();

  /**
   * Emit updates when user focuses input field
   *
   *
   * @memberOf TextInputComponent
   */
  @Output() inputFocus: EventEmitter<string> = new EventEmitter();

  /**
   * DOM Element reference to input field container
   *
   *
   * @memberOf TextInputComponent
   */
  @ViewChild("inputFieldContainer", { static: false })
  inputFieldContainer: ElementRef;

  /**
   * Form control for text input
   *
   *
   * @memberOf TextInputComponent
   */
  control: FormControl;

  /**
   * Flag indicating if form field is required
   *
   *
   * @memberOf TextInputComponent
   */
  required: boolean;

  /**
   * Inline validation error
   *
   *
   * @memberOf TextInputComponent
   */
  validationError: ValidationErrors;

  /**
   * Inline parent validation error
   *
   *
   * @memberof TextInputComponent
   */
  parentValidationError: ValidationErrors;

  /**
   * Custom error state matcher
   *
   *
   * @memberOf TextInputComponent
   */
  errorMatcher: ErrorStateMatcher;

  /**
   * Material input container
   *
   *
   * @memberOf TextInputComponent
   */
  matInputContainer: HTMLElement;

  /**
   * Creates an instance of TextInputComponent.
   * @param {FormGroupDirective} formGroupDir form group directive
   * @memberOf TextInputComponent
   */
  constructor(private formGroupDir: FormGroupDirective) {}

  /**
   * Angular lifecycle hook when component initializes
   *
   * @memberOf TextInputComponent
   */
  ngOnInit(): void {
    this.errorMatcher = new CustomErrorStateMatcher(this.validationErrors);
    this.addFormControl();
  }

  /**
   * Angular lifecycle hook after component's view is initialized
   *
   * @memberOf TextInputComponent
   */
  ngAfterViewInit(): void {
    this.matInputContainer = this.inputFieldContainer.nativeElement.querySelector(
      ".mat-form-field"
    );
    if (this.ariaInputRole) {
      this.matInputContainer.setAttribute("role", "button");
      this.matInputContainer.setAttribute("aria-haspopup", "listbox");
      this.matInputContainer.setAttribute("tabindex", "0");
    }
  }

  /**
   * Angular lifecycle hook when component triggers simple changes
   *
   * @memberOf TextInputComponent
   */
  ngOnChanges(): void {
    if (this.ariaInputRole && this.inputFieldContainer) {
      const ariaLabel = this.value
        ? `${this.placeholder}-${this.value}`
        : this.placeholder;
      this.inputFieldContainer.nativeElement
        .querySelector(".mat-form-field")
        .setAttribute("aria-label", ariaLabel);
    }
  }

  /**
   * Focus on mat input element
   *
   * @memberOf TextInputComponent
   */
  focusOnInput(): void {
    this.matInputContainer && this.matInputContainer.focus();
  }

  /**
   * Angular lifecycle hook when component is destroyed
   *
   * @memberOf TextInputComponent
   */
  ngOnDestroy(): void {
    this.removeFormControl();
  }

  /**
   * Function to check if input error should be shown
   *
   * @returns boolean flag to show/hide error
   * @memberOf TextInputComponent
   */
  showInputError(): boolean {
    let showError = false;
    let showParentError = false;

    // handle parent error
    if (this.control.parent.validator && this.control.parent.invalid && this.control.parent.touched || this.formGroupDir.submitted) {
      this.validationError = this.parentValidationError = this.getParentErrorMessage();
      showParentError = this.parentValidationError ? true : false;
    }
    // handle control error, if has parent error, show parent
    if (this.control.invalid && this.control.touched || this.formGroupDir.submitted) {
      this.validationError = this.parentValidationError ? this.parentValidationError : this.getErrorMessage();
      showError = this.validationError ? true : false;
    }
    return showParentError || showError;
  }

  /**
   * Get error message for corresponding error flag
   *
   * @ returns error message
   * @memberOf TextInputComponent
   */
  getErrorMessage(): ValidationErrors {
    return this.validationErrors.find(
      error => {
        return this.control.errors && this.control.errors[error.flag] || null
      }
    );
  }

  /**
   * Get error message for corresponding parent error flag
   *
   * @ returns error message
   * @memberof TextInputComponent
   */
  getParentErrorMessage(): ValidationErrors {
    return this.control.parent.errors? this.validationErrors.find(
      error => this.control.parent.errors[error.flag]
    ) : null;
  }

  /**
   * Callback when ngModel changes
   *
   *  {string} value updated value
   * @memberOf TextInputComponent
   */
  onNgModelChange(value: string): void {
    // this check is required as some Androids don't respect maxlength attribute
    if (this.maxLength && value.length <= this.maxLength) {
      value = value.substr(0, this.maxLength);
    }
    // we only emit what has been passed down to this component
    // and emit the value straight out
    this.status.emit(value);
  }

  /**
   * Add text input form control to parent form
   *
   *
   * @memberOf TextInputComponent
   */
  private addFormControl(): void {
    // we need the disabled flag in order for angular to run the required
    // validator without editing the field
    this.control = new FormControl(
      {
        value: this.value,
        disabled: this.disabled
      },
      this.validators
    );
    this.parentFormGroup.addControl(this.controlName, this.control);
    this.parentFormGroup.setValidators(this.parentFormGroupValidators);
  }

  /**
   * Remove text input form control to parent form
   *
   * @memberOf TextInputComponent
   */
  private removeFormControl(): void {
    if (
      this.parentFormGroup &&
      this.parentFormGroup.contains(this.controlName)
    ) {
      this.parentFormGroup.removeControl(this.controlName);
    }
  }

  /**
   * Apply the transformation on the input text, before it renders on the screen
   * @param input value that user has
   */

  applyTransform($event: any): void {
    if (this.transform) {
      let finalValue = $event.target.value;
      if (this.transform === "uppercase") {
        finalValue = finalValue.toUpperCase();
      } else if (this.transform === "lowercase") {
        finalValue = finalValue.toLowerCase();
      }
      $event.target.value = finalValue;
    }
  }
}
