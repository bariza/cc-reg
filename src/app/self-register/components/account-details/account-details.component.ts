import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountDetailsValues, InputTypes, SelfRegFieldLengths} from 'src/common/constants/self-register.constant';
import {SelfRegMasks} from 'src/common/constants/masks.constant';
import {DeviceInfoService} from 'src/common/services/device-info.service';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import * as selfRegActions from '../../state-management/actions/self.register.actions';
import {LocalStorageService, Keys} from 'src/common/services/local-storage.service';
import {ApiErrors} from '../../../errors/models/api.errors';
import {routerTransition} from 'src/common/animations/router.animations';
import {Router, ActivatedRoute} from '@angular/router';
import {SelfRegisterState} from '../../models';
import {TranslationsOB} from 'src/common/i18n/translationsob';
import {getErrordetails} from 'src/common/helpers/helpers';

@Component({
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  animations: [routerTransition()],
})
export class AccountDetailsComponent implements OnInit, AfterViewChecked, AfterViewInit {
  /**
   * Set Animation
   * @memberof AccountDetailsComponent
   */
  @HostBinding('@routerTransition') routerTransition = '';

  // TODO add JSDoc for all properties
  SelfRegFieldLengths = SelfRegFieldLengths;
  SelfRegMasks = SelfRegMasks;
  accountDetailsFormGroup: FormGroup;
  errors: Array<ApiErrors> = [];
  width: number;
  loading = false;
  cardError = false;
  cvcError = false;
  expiryDateError = false;
  showToolTip = false;
  toolTipClass = '';
  toolTipErrorClass = '';

  /**
   * the input types
   * @memberOf AccountDetailsComponent
   */
  inputTypes = InputTypes;

  // TODO move all validation to validator.constants file
  datePickerValidators = [
    Validators.required,
  ];

  datePickerValidationErrors = [
    {
      flag: 'required',
      message: 'expiry required'
    }
  ];

  creditCardNumberValidators = [
    Validators.required,
  ];

  creditCardNumberValidationErrors = [
    {
      flag: 'required',
      message: 'cc number required'
    },
    {
      flag: 'minlength',
      message: 'cc number must be 16 chars'
    }
  ];

  CVCNumberValidators = [
    Validators.required
  ];

  CVCNumberValidationErrors = [
    {
      flag: 'required',
      message: 'cvc required'
    },
    {
      flag: 'minlength',
      message: 'cvc must be 3 chars'
    }
  ];

  newDateValue = {
    day: '',
    month: '',
    year: '',
    text: ''
  };

  @HostListener('window:touchstart', ['$event'])
  onClick(event) {
    if (event.srcElement.id !== 'question_mark'
      && event.srcElement.className !== 'info-box'
      && event.srcElement.className !== 'tooltip-title'
      && event.srcElement.className !== 'cheque-img') {
      this.showToolTip = false;
    }
    if (event.srcElement.className !== 'mat-input-container') {
      const inputFields = this.el.nativeElement.querySelectorAll('input');
      for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].blur();
      }
    }
  }

  constructor(private fb: FormBuilder,
              private _deviceInfo: DeviceInfoService,
              private  _store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private translations: TranslationsOB,
              private localStorage: LocalStorageService,
              private el: ElementRef) {
    this.buildForm();
  }

  ngOnInit() {
    this._deviceInfo.getWidth().subscribe(width => this.width = width);
    this._store.dispatch(selfRegActions.resetState());
    // TODO remove component subscription and add selector
    this._store.subscribe(resp => {
      this.loading = !!resp.selfRegister['loading'];
      if (resp.selfRegister.accountDetailsPassed && resp.selfRegister.verificationQuestions) {
        this.localStorage.set(Keys.SECURITY_QUESTION, resp.verificationQuestions);
      }
      if (resp.selfRegister.step1Errors) {
        const errorObj = {
          ...resp.selfRegister.step1InlineError,
          displayText: getErrordetails(resp.selfRegister.step1InlineError.code).message
        };
        this.errors = [].concat(errorObj);
      }
      this.setToolTipPerLanguage(resp.selfRegister.applicationLanguage);
    });
  }

  onDateChange($event) {
    this.newDateValue.text = $event;
  }

  private setToolTipPerLanguage(lang) {
    switch (lang) {
      case 'en':
        this.toolTipClass = 'tooltip-en';
        break;
      case 'fr':
        this.toolTipClass = 'tooltip-fr';
        break;
    }
  }

  private buildForm() {
    this.accountDetailsFormGroup = this.fb.group({});
  }

  submitAccountDetailsForm($evt: Event): void {
    $evt.preventDefault();
    if (!this.loading) {
      const values = this.getAccountDetailsFormValues();
      this.cardError = +values.creditCardNumber.length < 16;
      this.expiryDateError = +values.cvcNumber.length < 4;
      this.cvcError = +values.cvcNumber.length < 3;
      if (this.accountDetailsFormGroup.valid) {
        const payload = {
          cardNumber: values.creditCardNumber,
          cvc: values.cvcNumber,
          expireDate: values.expiryDate
        };

        // this._store.dispatch(selfRegActions.accountDetailsSubmitStarted({payload}));
        // TODO remove next line when CS is up
        this.router.navigate(['/identification']);
      }
    }
  }

  getAccountDetailsFormValues(): AccountDetailsValues {
    const accountDetailsFormValue = this.accountDetailsFormGroup.value;
    if (accountDetailsFormValue.creditCardNumber) {
      accountDetailsFormValue.creditCardNumber = accountDetailsFormValue.creditCardNumber.replace(/\D/g, '');
    }
    return accountDetailsFormValue;
  }

  /**
   * handle accessibility requirement
   */
  ngAfterViewChecked() {
    this.updateAccessibilityAttribute();
  }

  /**
   * handle accessibility requirement
   */
  ngAfterViewInit(): void {
    this.goToHeader();
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
   * @param {field} field:InputFields
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
   *  Function that focuses on header as the page loads
   */
  goToHeader() {
    const header = document.getElementById('header');
    if (header) {
      document.getElementById('header').focus();
    }
  }

  getTranslations(): TranslationsOB {
    return this.translations;
  }

  /**
   * get current year
   * @returns {number} the year
   * @memberOf AccountDetailsComponent
   */
  getCurrentYear() {
    return moment().year();
  }
}
