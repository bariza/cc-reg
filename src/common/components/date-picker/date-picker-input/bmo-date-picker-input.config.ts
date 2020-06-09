import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

/**
 * Sample datepicker config
 *
 * @export
 *  BmoNgDatePickerInputConfig
 */
@Injectable()
export class BmoNgDatePickerInputConfig {

  /**
   * Creates an instance of BmoNgDatePickerInputConfig.
   * @memberof BmoNgDatePickerInputConfig
   */
  constructor() { }


  /**
   * Datepicker form input control name
   *
   * @memberof BmoNgDatePickerInputConfig
   */
  datePickerFormInputControl = 'datePickerInputControl';

  /**
   * Placeholder label for full mode
   *
   * @memberof BmoNgDatePickerInputConfig
   */
  fullModePlaceHolder = 'fullModePlaceHolder';

  /**
   * Placeholder label for part mode
   *
   * @memberof BmoNgDatePickerInputConfig
   */
  partModePlaceHolder = 'partModePlaceHolder';


}
