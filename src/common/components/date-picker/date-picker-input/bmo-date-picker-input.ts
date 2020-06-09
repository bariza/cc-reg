import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import * as _moment from 'moment';

import { BmoNgDatePickerInputConfig } from './bmo-date-picker-input.config';
import {BmoNgDatePickerComponent, DATE_PICKER_MODE} from '../bmo-date-picker.component';
import {TextInputComponent} from '../../text-input/text-input.component';
import {HEADER_PROGRESS_BAR_OFFSET, scrollToEl} from 'src/common/helpers/scroll-to-element';

// allow ng-packgr to compile
const moment = _moment;

@Component({
  selector: 'bmo-ng-date-picker-input',
  templateUrl: './bmo-date-picker-input.html',
  styleUrls: ['./bmo-date-picker-input.scss']
})
export class BmoNgPickerInputComponent implements OnInit, AfterViewInit {
  /**
   * Id for host element (used as target for testing/analytics)
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() id: string;

  /**
   * Form control name for datepicker input
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() datePickerControl: string;

  /**
   * Format to display the date
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() datePickerMode: string;

  /**
   * Parent form group with the datepicker form control
   *
   * @type {FormGroup}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() parentFormGroup: FormGroup;

  /**
   * Form validators for datepicker input
   *
   * @type {ValidatorFn[]}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() validators: ValidatorFn[];

  /**
   * List of form validation errors for datepicker input
   *
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() validationErrors = [];

  /**
   * Label for date format
   *
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() label = '';

  /**
   * default start decade on datepicker show
   *
   * @type {number}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() defaultDecade: number;

  /**
   * Enable future dates to be selected
   *
   * @memberOf BmoNgDatePickerComponent
   */
  @Input() allowFutureDate = false;

  /**
   * Maximum years in the future to display in calendar
   *
   * @type {number}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input() maxYearsInFuture = 20;

  /**
   * date standard string accepts format of "YYYY-MM-DD"
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  @Input('date')
  set standardDate(standardDate: string) {
    if (standardDate === '') {
      this.displayDate = null;
      this.getPlaceholderOrValue();
    }
    else if(standardDate){
      this.outputDate = standardDate;
      const dateParts = moment(standardDate).format('YYYY-MMM-DD').split('-');
      this.year = dateParts[0];
      this.month = dateParts[1];
      this.day = this.datePickerMode === DATE_PICKER_MODE.FULL ? dateParts[2] : '';
    }
  }

  /**
   * Selected day
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  day: string;

  /**
   * Month field
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  month: string;

  /**
   * Selected year
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  year: string;

  /**
   * Emit status updates to parent component
   *
   * @memberOf BmoNgPickerInputComponent
   */
  @Output() onStatus = new EventEmitter();

  /**
   * Emit close event to parent component
   *
   * @memberOf BmoNgPickerInputComponent
   */
  @Output() onClose = new EventEmitter();

  /**
   * Reference text input child component
   *
   * @type {TextInputComponent}
   * @memberOf BmoNgPickerInputComponent
   */
  @ViewChild(TextInputComponent, {static: false}) inputField: TextInputComponent;

  /**
   * Reference datepicker child component
   *
   * @type {BmoNgDatePickerComponent}
   * @memberOf BmoNgPickerInputComponent
   */
  @ViewChild(BmoNgDatePickerComponent, {static: false}) datePicker: BmoNgDatePickerComponent;

  /**
   * Date picker mode
   *
   * @type {typeof DATE_PICKER_MODE}
   * @memberOf BmoNgPickerInputComponent
   */
  DATE_PICKER_MODE: typeof DATE_PICKER_MODE = DATE_PICKER_MODE;

  /**
   * Default datepicker mode
   *
   * @memberOf BmoNgPickerInputComponent
   */
  defaultDatePickerMode = DATE_PICKER_MODE.FULL;

  /**
   * Flag to show datepicker
   *
   * @memberOf BmoNgPickerInputComponent
   */
  showPicker = false;

  /**
   * Flag to indicate if full date was selected
   *
   * @memberOf BmoNgPickerInputComponent
   */
  dateSelected = false;

  /**
   * Date string shown as placeholder for display
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  displayDate: string;

  /**
   * Format used to display dates
   *
   * @memberOf BmoNgPickerInputComponent
   */
  displayDateFormat: string;

  /**
   * Date string emitted to parent components
   *
   * @type {string}
   * @memberOf BmoNgPickerInputComponent
   */
  outputDate = '';

  /**
   * Form control with datepicker
   *
   * @private
   * @type {AbstractControl}
   * @memberOf BmoNgPickerInputComponent
   */
  private control: AbstractControl;

  /**
   * Creates an instance of BmoNgPickerInputComponent.
   * @param {BmoNgDatePickerInputConfig} config datepicker config
   * @param {ElementRef} elementRef the element reference
   * @memberOf BmoNgPickerInputComponent
   */
  constructor(
    public config: BmoNgDatePickerInputConfig,
    private elementRef: ElementRef
  ) { }

  /**
   * Angular lifecycle hook when component initializes
   *
   * @memberOf BmoNgPickerInputComponent
   */
  ngOnInit() {
    if (this.day && this.month && this.year) {
      this.dateSelected = true;
    }
    this.displayDateFormat = this.datePickerMode === DATE_PICKER_MODE.FULL ? 'D MMM YYYY' : 'MMMM YYYY';
    this.displayDate = this.outputDate ? moment(this.outputDate).format(this.displayDateFormat) : '';
  }

  /**
   * Angular lifecycle hook when component view initializes
   *
   * @memberOf BmoNgPickerInputComponent
   */
  ngAfterViewInit() {
    // after child text-input has been initialized and formControl exists
    this.control = this.parentFormGroup.get(this.datePickerControl);
  }

  /**
   * Callback for clicking show button
   *
   * @memberOf BmoNgPickerInputComponent
   */
  onClickShow() {
    scrollToEl(this.elementRef, HEADER_PROGRESS_BAR_OFFSET, 155);
    this.datePicker.showMonthsPicker();
    this.showPicker = true;
    this.dateSelected = false;
  }

  /**
   * Callback for clicking show button
   *
   * @param {*} val
   * @memberOf BmoNgPickerInputComponent
   */
  onClickHide(val) {
    this.setSelectedDate();
    this.onValueChange();
    this.onClose.emit(val);
    this.inputField.focusOnInput();
  }

  /**
   * Callback when month selected
   *
   * @param {*} month
   * @memberOf BmoNgPickerInputComponent
   */
  onMonthSelect(month) {
    this.month = month;
  }

  /**
   * Callback when day selected
   *
   * @param {*} day
   * @memberOf BmoNgPickerInputComponent
   */
  onDaySelect(day) {
    // add a leading zero when its a single digit
    this.day = ('0' + day).slice(-2);  
  }

  /**
   * Callback when year selected
   *
   * @param {*} year
   * @memberOf BmoNgPickerInputComponent
   */
  onYearSelect(year) {
    this.year = year;
  }

  /**
   * Manually set form value and emit update
   *
   * @param {string} val
   * @memberOf BmoNgPickerInputComponent
   */
  onValueChange() {
    this.dateSelected = true;
    if (
      this.control &&
      this.control.value !== this.outputDate
    ) {
      this.control.setValue(this.outputDate);
    }
    this.onStatus.emit(this.outputDate);
  }

  /**
   * Get the placeholder or value to be displayed on overlay text
   *
   * @returns {string}
   * @memberOf BmoNgPickerInputComponent
   */
  getPlaceholderOrValue(): string {
    return !this.displayDate ? this.label : this.displayDate;
  }

  /**
   * Format and set display and output dates
   *
   * @param {string} value
   * @memberOf BmoNgPickerInputComponent
   */
  setDateFormatted(value: string) {
    let calendarDateFormat = 'MMMYYYY';
    let outputDateFormat = 'YYYY-MM';
    if (this.datePickerMode === DATE_PICKER_MODE.FULL) {
      calendarDateFormat = 'MMMDDYYYY';
      outputDateFormat = 'YYYY-MM-DD';
    }
    const momentDate = moment(value, calendarDateFormat);
    this.displayDate = '';
    this.outputDate = '';
    if (momentDate.isValid()) {
      this.outputDate =  momentDate.format(outputDateFormat);
      this.displayDate = momentDate.format(this.displayDateFormat);
    }
  }

  /**
   * Set selected date
   *
   * @memberOf BmoNgPickerInputComponent
   */
  setSelectedDate() {
    const dateString = this.month + this.day + this.year;
    this.setDateFormatted(dateString);
  }

}
