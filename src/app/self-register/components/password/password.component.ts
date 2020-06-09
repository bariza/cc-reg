import {
  Component, OnInit, HostListener, HostBinding, ViewChild, ElementRef, ViewEncapsulation,
  AfterViewChecked, AfterViewInit
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as  selfRegActions  from '../../state-management/actions/self.register.actions';
import { InputFields } from '../../models/input.fields';
import { ApiErrors } from '../../../errors/models/api.errors';
import { SelfRegFieldLengths } from '../../../../common/constants/self-register.constant';

import { routerTransition } from '../../../../common/animations/router.animations';
//import { ShowHideInputDirective } from '../../../../common/directives/show-hide-password';
import * as HELPERS from '../../../../common/helpers/helpers';
//import { DeviceInfoService } from '../../../../common/services/device-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceInfoService } from 'src/common/services/device-info.service';
import { SelfRegisterState } from '../../models';
import { TranslationsOB } from 'src/common/i18n/translationsob';
import { TranslateService } from '@ngx-translate/core';


import {
  validateLength,  validateMandatorySpecialCharsRule,  validateNumbersRule,  validateUpperAndLowerCaseRule
} from './password.validation';

@Component({
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()],
})

export class PasswordComponent implements OnInit, AfterViewChecked, AfterViewInit {
  /**
   * Set Animation
   * @memberof PasswordComponent
   */
  @HostBinding('@routerTransition') routerTransition = '';

  errors: Array<ApiErrors> = [];
  passwordMismatch = false;
  toolTipClass = '';
  showToolTip = false;
  selfRegFieldLengths = SelfRegFieldLengths;
  passwordFormGroup: FormGroup;
  width: Number;
  loading = false;
  showValidations = false;
  passwordLengthValid = false;
  passwordContainsUpperCaseLowerCase = false;
  passwordContainsNumber = false;
  passwordContainsSpecialChar = false;
  passwordContainsIllegalChars = false;

  // TODO: Not decided to move in constants yet
  // Define validators
  passwordValidation = [
    Validators.required,
  ];
  passwordValidationErrors = [
    {
      flag: 'required',
      message: this.translate.instant(this.translations.KEY.CCREG.PASSWORD.VALIDATION.ERROR.REQUIRED)
    }
  ];
  passwordConfirmationValidation = [
    Validators.required,
  ];
  passwordConfirmationValidationErrors = [
    {
      flag: 'required',
      message: this.translate.instant(this.translations.KEY.CCREG.PASSWORD.VALIDATION.ERROR.REQUIRED)
    },
    {
      flag: 'notSame',
      message: this.translate.instant(this.translations.KEY.CCREG.PASSWORD.VALIDATION.ERROR.NOT_SAME)
    }
  ];
  passwordFormGroupValidation = [
    this.checkPasswords
  ];

  // Define control names
  controlName = {
    password: 'password',
    password_confirmation : 'password_confirmation'
  };

  /**
   * @param {ShowHideInputDirective}
   * @listens ShowHideInputDirective
   */
  //@ViewChild(ShowHideInputDirective) input: ShowHideInputDirective;

  @HostListener('window:touchstart', ['$event'])
  onClick(event) {
    if (event.srcElement.id !== 'info_mark'
      && event.srcElement.id !== 'info_button_wrapper'
      && event.srcElement.className !== 'info-box'
      && event.srcElement.className !== 'tooltip-title'
      && event.srcElement.className !== 'number-guide') {
      this.showToolTip = false;
    }
  }

  constructor(private fb: FormBuilder,
              private _deviceInfo: DeviceInfoService,
              private el: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private translations: TranslationsOB,
              private _store: Store<SelfRegisterState>) {
    this.buildForm();
  }

  private buildForm() {
    this.passwordFormGroup = this.fb.group({});
  }

  ngOnInit() {
    this._deviceInfo.getWidth().subscribe(width => this.width = width);
    this._store.dispatch(selfRegActions.resetState());
    //this._store.select('stepResponse').subscribe(resp => {
    //  this.loading = !!resp['loading'];
    //})
  }

  submitPasswordForm($evt) {
    this.showValidations = true;
    if (this.passwordFormGroup.valid && !this.passwordMismatch &&
      this.passwordMeetsMandatoryRequirements() && !this.loading) {
      const data = {
        passwordInfo: {
          fbcPassword: this.passwordFormGroup.controls.password.value,
        }
      };
      // TODO: the mock service is not finished, so just do navigation.
      // this._store.dispatch(selfRegActions.passwordSubmitStarted({data}));
      this.router.navigate(['../confirmation'], {relativeTo: this.route});
    }
  }

  /**
   * handle input keyup event
   * @param {InputFields} field input
   */
  handleKeyUp(field) {
    if (field === this.controlName.password) {
      this.showValidations = true;
      this.passwordLengthValid = validateLength(this.passwordFormGroup.controls.password.value, 8, 32);
      this.passwordContainsUpperCaseLowerCase  = validateUpperAndLowerCaseRule(this.passwordFormGroup.controls.password.value);
      this.passwordContainsNumber = validateNumbersRule(this.passwordFormGroup.controls.password.value);
      this.passwordContainsSpecialChar = validateMandatorySpecialCharsRule(this.passwordFormGroup.controls.password.value);
    }
  }

  /**
   * check all password validations
   * @returns {boolean} password validity
   */
  passwordMeetsMandatoryRequirements(): boolean {
    return this.passwordLengthValid && this.passwordContainsUpperCaseLowerCase
      && this.passwordContainsSpecialChar && this.passwordContainsNumber && !this.passwordContainsIllegalChars;
  }
  /**
   * handle input blur
   * @param {InputFields} field input
   */
  handleOnBlur(field) {
    switch (field) {
    case this.controlName.password:
      const confirmation = this.passwordFormGroup.controls.password_confirmation.value;
      this.passwordMismatch = confirmation !== '' && this.passwordFormGroup.controls.password.value !== confirmation;
      break;
    case this.controlName.password_confirmation:
      this.passwordMismatch = this.passwordFormGroup.controls.password_confirmation.value !== this.passwordFormGroup.controls.password.value;
    }
  }

  /**
   * handle input focus
   * @param {InputFields} field input
   */
  handleFocus(field) {
    if (field === this.controlName.password) {
      this.handleKeyUp(field);
    }
  }

  /**
   * handle copy to input field
   * @param {e} e:event
   * @returns {boolean} stop the copy
   */
  onCopy(e) {
    return false;
  }

  /**
   * handle paste into input field
   * @param {e} e:event
   * @returns {boolean} stop the paste
   */
  onPaste(e) {
    return false;
  }

  /**
   * handle accessibility aria-hidden attr
   */
  updateAccessibilityAttribute() {
    const elements = this.el.nativeElement.querySelectorAll('label.mat-input-placeholder');
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('aria-hidden', 'true');
      }
    }
  }

  /**
   * handle accessibility requirement
   */
  ngAfterViewChecked() {
    this.updateAccessibilityAttribute();
  }

  /**
   * handle Accessibility Requirement
   * @returns void
   */
  ngAfterViewInit() {
    this.goToHeader();
  }

  /**
   * check both fields matching passwords
   * @param {FormGroup} passwordFormGroup
   * @returns {notSame: boolean}
   */
  checkPasswords(passwordFormGroup: FormGroup) { // here we have the 'passwords' group
    if (passwordFormGroup.controls && passwordFormGroup.controls.password && passwordFormGroup.controls.password.value !== '' 
    && passwordFormGroup.controls.password_confirmation && passwordFormGroup.controls.password_confirmation.value !== ''){
      if(passwordFormGroup.controls.password.value === passwordFormGroup.controls.password_confirmation.value) {
        return null;
      } else {
        return { notSame: true };
      }
    }
    return null;
  }

  /**
   *  Function that focuses on header as the page loads
   */
  goToHeader() {
    if (document.getElementById('header')) {
      document.getElementById('header').focus();
    }
  }

  /**
   * get tranlsations object
   */
  getTranslations(): TranslationsOB {
    return this.translations;
  }

  /**
   * get password max length
   */
  getSelfRegFieldPasswordMax(): number {
    return this.selfRegFieldLengths.Password.max;
  }

  /**
   * get password min length
   */
  getSelfRegFieldPasswordMin(): number {
    return this.selfRegFieldLengths.Password.min;
  }

}
