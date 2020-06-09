import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  LocalStorageService,
  Keys
} from 'src/common/services/local-storage.service';
import { InputTypes, SelfRegFieldLengths } from 'src/common/constants/self-register.constant';
import { SelfRegMasks } from 'src/common/constants/masks.constant';
import {
  SelfRegValidationErrors,
  SelfRegValidators
} from 'src/common/constants/validator.constants';
import { DeviceInfoService } from 'src/common/services/device-info.service';
import { TranslationsOB } from 'src/common/i18n/translationsob';
import { VerificationRequest } from 'src/common/models/self-reg-api-response';
import { routerTransition } from 'src/common/animations/router.animations';

import { SelfRegisterState } from '../../models';
import { selectSelfRegisterState } from '../../state-management/selectors/self-register.selectors';
import { ApiErrors } from '../../../errors/models/api.errors';
import * as selfRegActions from '../../state-management/actions/self.register.actions';
import { getErrordetails } from 'src/common/helpers/helpers';

import * as moment from 'moment';

/**
 * The customer identification form component
 * @export
 * @class IdentificationComponent
 */

@Component({
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()]
})
export class IdentificationComponent
  implements OnInit, AfterViewChecked, AfterViewInit {
  /**
   * Set Animation
   * @memberOf IdentificationComponent
   */
  @HostBinding('@routerTransition') routerTransition = '';

  /**
   * Inline Errors
   * @type {Array<ApiErrors>}
   * @memberOf IdentificationComponent
   */
  errors: Array<ApiErrors> = [];
  identificationFormGroup: FormGroup;
  loading = false;
  deactivation_allowed = false;
  identificationQuestion: string;
  width: Number;
  /**
   * Length of the identification fields
   * @memberOf IdentificationComponent
   */
  SelfRegFieldLengths = SelfRegFieldLengths;

  /**
   * Text field masks for the identification fields
   * @memberOf IdentificationComponent
   */
  SelfRegMasks = SelfRegMasks;

  /**
   * Validators for the identification fields
   * @memberOf IdentificationComponent
   */
  SelfRegValidators = SelfRegValidators;
  /**
   * ValidationErrors for the identification fields
   * @memberOf IdentificationComponent
   */
  SelfRegValidationErrors = SelfRegValidationErrors;

  newDateValue = {
    day: '',
    month: '',
    year: '',
    text: ''
  };

  /**
   * the input types
   * @memberOf IdentificationComponent
   */
  inputTypes = InputTypes;

  /**
   * Creates an instance of IdentificationComponent.
   * @param {Store<any>} _store the injected application store
   * @param {FormBuilder} fb form builder in order to build the auth form
   * @param {ElementRef} el element reference
   * @param {DeviceInfoService} _deviceInfo device information service
   * @param {TranslationsOB} translations translation service
   * @param {LocalStorageService} localStorage local storage service
   * @returns {void}
   * @memberOf IdentificationComponent
   */
  constructor(
    private _store: Store<any>,
    private fb: FormBuilder,
    private el: ElementRef,
    private _deviceInfo: DeviceInfoService,
    private translations: TranslationsOB,
    private localStorage: LocalStorageService
  ) {
    this.buildForm();
  }

  /**
   * Method to build the form components
   * @memberOf IdentificationComponent
   */
  private buildForm() {
    this.identificationFormGroup = this.fb.group({});
  }

  /**
   * ngOnInit hook
   * @memberOf IdentificationComponent
   */
  ngOnInit() {
    this._deviceInfo.getWidth().subscribe(width => (this.width = width));
    this._store.dispatch(selfRegActions.resetState());
    this._store.subscribe(resp => {
      this.loading = !!resp.selfRegister['loading'];
      if (
        resp.selfRegister.accountDetailsPassed &&
        resp.selfRegister.verificationQuestions
      ) {
        this.localStorage.set(
          Keys.SECURITY_QUESTION,
          resp.verificationQuestions
        );
      }
      if (resp.selfRegister.step2Errors) {
        const errorObj = {
          ...resp.selfRegister.step2InlineError,
          displayText: getErrordetails(resp.selfRegister.step2InlineError.code)
            .message
        };
        this.errors = [].concat(errorObj);
      }
    });
  }

  /**
   * ngAfterViewChecked hook
   * handle accessibility requirement
   * @memberOf IdentificationComponent
   */
  ngAfterViewChecked() {
    this.updateAccessibilityAttribute();
  }

  /**
   * Method to handle the date change event
   * @memberOf IdentificationComponent
   */
  onDateChange($event) {
    this.newDateValue.text = $event;
  }

  /**
   * ng after view init hook
   * @memberOf IdentificationComponent
   */
  ngAfterViewInit() {
    this.goToHeader();
  }

  /**
   * Method to prevent the copy text from the field
   * @param {e} e:event
   * @returns {boolean} stop the copy
   * @memberOf IdentificationComponent
   */
  onCopy(e) {
    return false;
  }

  /**
   * handle paste into input field
   * @param {e} e:event
   * @param {field} field:InputFields
   * @returns {boolean} stop the paste
   * @memberOf IdentificationComponent
   */
  onPaste(e) {
    return false;
  }

  /**
   * handle submit identification form
   * @param {Event} $evt the form submit event
   * @param {transactions} transactions:InputFields
   * @memberOf IdentificationComponent
   */
  submitIdentificationForm($evt: Event): void {
    $evt.preventDefault();
    if (!this.loading) {
      if (this.identificationFormGroup.valid) {
        let identificationFormValue = this.getIdentificationFormValues();
        const payload: VerificationRequest = {
          businessPhone: identificationFormValue.businessPhone,
          cardNumber: '',
          challengeToken: '',
          dob: identificationFormValue.dateOfBirth,
          homePhone: identificationFormValue.homePhone,
          postalCode: identificationFormValue.postalCode
        };
        this._store.dispatch(
          selfRegActions.identificationSubmitStarted({ payload })
        );
      }
    }
  }

  /**
   * Method to get the identification form values after removing any special characters
   * @memberOf IdentificationComponent
   */
  getIdentificationFormValues() {
    const identificationFormValue = this.identificationFormGroup.value;
    if (identificationFormValue.businessPhone) {
      identificationFormValue.businessPhone = identificationFormValue.businessPhone.replace(
        /\D/g,
        ''
      );
    }
    if (identificationFormValue.homePhone) {
      identificationFormValue.homePhone = identificationFormValue.homePhone.replace(
        /\D/g,
        ''
      );
    }
    if (identificationFormValue.postalCode) {
      identificationFormValue.postalCode = identificationFormValue.postalCode.replace(
        /\W/g,
        ''
      );
    }
    return identificationFormValue;
  }

  /**
   * Accessor method for route guard candeactivate
   * @returns {boolean} allowed or not
   */
  canDeactivate() {
    return this.deactivation_allowed;
  }

  /**
   * Update the accessibility attribute
   * @memberOf IdentificationComponent
   */
  updateAccessibilityAttribute() {
    const elements = this.el.nativeElement.querySelectorAll(
      'label.mat-input-placeholder'
    );
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('aria-hidden', 'true');
      }
    }
  }

  /**
   * Method to set the focus on the header when the page loads
   * @memberOf IdentificationComponent
   */
  goToHeader() {
    if (document.getElementById('header')) {
      document.getElementById('header').focus();
    }
  }

  /**
   * Method to get the translations service
   * @memberOf IdentificationComponent
   */
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
