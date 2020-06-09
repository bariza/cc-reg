import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

/**
 * The interface the error objects returned from custom validations
 * below should conform to
 *
 * @export
 * @interface IError
 */
export interface IError {
  [key: string]: any;
}

export const validateConfirmPassword = (passwordControlName: string) => {
  return (control: FormControl) => {
    const passwordControl: AbstractControl = control.parent && control.parent.get(passwordControlName);
    if (control && passwordControl && control.value && passwordControl.value) {
      if (control.value !== passwordControl.value) {
        return { 'passwordMismatch': {
            expectedValue: passwordControl.value,
            actualValue: control.value
          } };
      }
    }
    return null;
  };
};

export const validatePasswordLength = () => {
  return (control: FormControl) => {
    const errors: IError = {};
    if (control && control.value) {
      if (control.value.length < 8) {
        errors['invalidPasswordLength'] = {
          expectedValue: 8,
          actualValue: control.value.length
        };
      }
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }
};

export const checkInvalidPasswordLength = (passwordFormGroup: FormGroup, controlName: string) => {
  return passwordFormGroup.controls[controlName].errors && passwordFormGroup.controls[controlName].errors.minlength

}
