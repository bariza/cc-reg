import { Injectable } from '@angular/core';
import EN from 'src/common/assets/i18n/en';

/**
 * config for datepicker component
 *
 * @export
 * @class BmoNgDatePickerConfig
 *  BmoNgDatePickerConfig
 */
@Injectable()
export class BmoNgDatePickerConfig {

  /**
   * Creates an instance of BmoNgDatePickerConfig.
   * @memberof BmoNgDatePickerConfig
   */
  constructor() {}

  pickerMonthLabel = EN.KEY.CCREG.DATEPICKER.PICKER_MONTH_LABEL;
  decadeSuffix = EN.KEY.CCREG.DATEPICKER.DECADE_SUFFIX;
  previousDecade = EN.KEY.CCREG.DATEPICKER.PREV_DECADE;
}
