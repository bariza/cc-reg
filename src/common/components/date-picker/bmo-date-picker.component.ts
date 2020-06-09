import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';

import { BmoNgDatePickerConfig } from './bmo-date-picker.config';
import {HEADER_PROGRESS_BAR_OFFSET, scrollToEl} from '../../helpers/scroll-to-element';

export enum DATE_PICKER_MODE {
  FULL = 'Full',
  PART = 'Part'
}
// allow ng-packgr to compile
const moment = _moment;
@Component({
  selector: 'bmo-ng-bmo-date-picker',
  templateUrl: './bmo-date-picker.component.html',
  styleUrls: ['./bmo-date-picker.component.scss']
})
export class BmoNgDatePickerComponent implements OnInit {
  /**
   * types of datepicker
   *
   * @type {typeof DATE_PICKER_MODE}
   * @memberof BmoNgDatePickerComponent
   */
  DATE_PICKER_MODE: typeof DATE_PICKER_MODE = DATE_PICKER_MODE;

  /**
   * localization for moment format definition
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  locale: string;
  /**
   * month label for the header
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  headerMonthLabel: string;
  /**
   * decade suffix
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  decadeSuffix: string;
  /**
   * previous decade
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  previousDecade: string;
  /**
   * value of month
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  @Input() selectedMonth: string;
  /**
   * value of year
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  @Input() selectedYear: string;
  /**
   * value of day
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  @Input() selectedDay: string;

  /**
   * Enable future dates to be selected
   *
   * @memberof BmoNgDatePickerComponent
   */
  @Input() showFutureDate: boolean;

  /**
   * Maximum years in the future to display in calendar
   *
   * @memberof BmoNgDatePickerComponent
   */
  @Input() maxYearsInFuture: number;

  /**
   * value of previously selected month
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  prevSelectedMonth: string;
  /**
   * value of previously selected day
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  prevSelectedDay: string;
  /**
   * value of previously selected year
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  prevSelectedYear: string;

  /**
   * the default decade
   *
   * @type {number}
   * @memberof BmoNgDatePickerComponent
   */
  @Input() defaultDecade: number;

  /**
   * the list of month elements
   *
   * @type {ElementRef}
   * @memberof BmoNgDatePickerComponent
   */

  @ViewChild('monthsList', {static: false}) monthsListEl: ElementRef;

  /**
   * the list of day elements
   *
   * @type {ElementRef}
   * @memberof BmoNgDatePickerComponent
   */
  @ViewChild('daysList' , {static: false}) daysListEl: ElementRef;

  /**
   * the list of year elements
   *
   * @type {ElementRef}
   * @memberof BmoNgDatePickerComponent
   */
  @ViewChild('yearsList' , {static: false}) yearsListEl: ElementRef;

  /**
   * the decades button
   *
   * @type {ElementRef}
   * @memberof BmoNgDatePickerComponent
   */
  @ViewChild('decadeButton' , {static: false}) decadeButtonEl: ElementRef;

  /**
   * the flag to show/hide the datepicker
   *
   * @memberof BmoNgDatePickerComponent
   */
  @HostBinding() @Input() showDatePicker = false;

  /**
   * the type of datepicker
   *
   * @type {DATE_PICKER_MODE}
   * @memberof BmoNgDatePickerComponent
   */
  @HostBinding() @Input() datePickerMode: DATE_PICKER_MODE;

  /**
   * back button flag
   *
   * @memberof BmoNgDatePickerComponent
   */
  showBackButton = false;

  /**
   * months section flag
   *
   * @memberof BmoNgDatePickerComponent
   */
  showMonths = true;

  /**
   * days section flag
   *
   * @memberof BmoNgDatePickerComponent
   */
  showDays = false;

  /**
   * years section flag
   *
   * @memberof BmoNgDatePickerComponent
   */
  showYears = false;

  /**
   * the list of defined months
   *
   * @memberof BmoNgDatePickerComponent
   */
  months = [];

  /**
   * the list of defined days for that month
   *
   * @memberof BmoNgDatePickerComponent
   */
  days = [];

  /**
   * the list of defined years
   *
   * @memberof BmoNgDatePickerComponent
   */
  years = [];

  /**
   * the decade label
   *
   * @type {number}
   * @memberof BmoNgDatePickerComponent
   */
  decadeLabel: number;

  /**
   * the maximum decade
   *
   * @type {number}
   * @memberof BmoNgDatePickerComponent
   */
  maxDecade: number;

  /**
   * the minimum decade
   *
   * @memberof BmoNgDatePickerComponent
   */
  minDecade = 1900;

  /**
   * current year value
   *
   * @type {number}
   * @memberof BmoNgDatePickerComponent
   */
  currentYear: number;

  /**
   * image source for decade back button
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  decadeBackImage: string;

  /**
   * image source for decade next button
   *
   * @type {string}
   * @memberof BmoNgDatePickerComponent
   */
  decadeNextImage: string;

  /**
   * emit value on month selection
   *
   * @memberof BmoNgDatePickerComponent
   */
  @Output() month = new EventEmitter();

  /**
   * emit value on year selection
   *
   * @memberof BmoNgDatePickerComponent
   */
  @Output() year = new EventEmitter();

  /**
   * emit value on day selection
   *
   * @memberof BmoNgDatePickerComponent
   */
  @Output() day = new EventEmitter();

  /**
   * emit event on showing date picker
   *
   * @memberof BmoNgDatePickerComponent
   */
  @Output() showPickerEmitter = new EventEmitter();

  /**
   * Creates an instance of BmoNgDatePickerComponent.
   *
   *  {TranslateService} translate
   *  {BmoNgDatePickerConfig} config sample datepicker config
   *  {ElementRef} elementRef DOM element ref
   *  {Renderer2} renderer
   * @memberof BmoNgDatePickerComponent
   */
  constructor(
    public config: BmoNgDatePickerConfig,
    private translate: TranslateService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.locale = event.lang;
      this.initCalendar();
    });
  }

  /**
   * Angular lifecycle hook when component initializes
   *
   * @memberof BmoNgDatePickerComponent
   */
  ngOnInit() {
    this.currentYear = moment().year();
    this.maxDecade = this.getCurrentDecade();
    if (this.showFutureDate) {
      this.minDecade = this.getCurrentDecade();
      this.maxDecade = this.minDecade + this.maxYearsInFuture;
    }
    this.initCalendar();
  }

  initCalendar() {
    moment.locale(this.locale);
    this.initializeMonthsPicker();
    this.initializeYearsPicker();
    this.initializeDaysOfMonth();
  }

  /**
   * Initialize the list of months format
   *
   * @memberof BmoNgDatePickerComponent
   */
  initializeMonthsPicker(): void {
    this.months = moment.monthsShort();
  }

  /**
   * Initialize the list of years format and setup default decade
   *
   * @memberof BmoNgDatePickerComponent
   */
  initializeYearsPicker(): void {
    const decade = this.selectedYear || this.defaultDecade || this.maxDecade;
    this.getYearsInDecade(Number(decade));
  }

  /**
   * Initialize the list of days format of the chosen month
   *
   * @memberof BmoNgDatePickerComponent
   */
  initializeDaysOfMonth(): void {
    // Initialize with a year if user has selected it before; otherwise initialize without year
    this.selectedYear
      ? this.getDaysOfMonth(this.selectedMonth, parseInt(this.selectedYear, 10))
      : this.getDaysOfMonth(this.selectedMonth, 0);
  }

  /**
   * focus on the specific item in the DOM
   * hide sections that are not visible to users for accessibility
   *
   * @memberof BmoNgDatePickerComponent
   */
  focusListElement(item: string): void {
    const sections = ['month', 'day', 'year'];
    sections.forEach(element => {
      if (!!this[`${element}sListEl`]) {
        const ulEl = this[`${element}sListEl`]
          .nativeElement as HTMLUListElement;
        if (element === item) {
          this.renderer.removeClass(ulEl, 'hide-element');
          if (element !== 'year') {
            this.renderer.addClass(
              this.decadeButtonEl.nativeElement,
              'hide-element'
            );
          } else {
            this.renderer.removeClass(
              this.decadeButtonEl.nativeElement,
              'hide-element'
            );
          }
          let selectedBtnEl = null;
          selectedBtnEl = ulEl.querySelector('li>button.selected');
          if (selectedBtnEl) {
            (selectedBtnEl as HTMLButtonElement).focus();
          } else {
            // Focus the first element in the list
            selectedBtnEl = ulEl.querySelector('li>button');
            if (selectedBtnEl) {
              (selectedBtnEl as HTMLButtonElement).focus();
            }
          }
        } else {
          this.renderer.addClass(ulEl, 'hide-element');
        }
      }
    });
  }

  /**
   * set the focus on the assigned date label
   *
   * @param {string} dateLabel
   * @memberof BmoNgDatePickerComponent
   */
  setFocus(dateLabel: string) {
    setTimeout(() => {
      this.focusListElement(dateLabel);
    }, 300);
  }

  /**
   * set the list of days for the specific month with the option of setting a specific year
   *
   * @param {string} month
   * @param {number} [year]
   * @memberof BmoNgDatePickerComponent
   */
  getDaysOfMonth(month: string, year?: number) {
    this.days = [];
    let daysOfMonth;
    if (!month) {
      daysOfMonth = 31;
    } else {
      daysOfMonth = moment()
        .year(year)
        .month(month)
        .daysInMonth();
    }
    let i = 1;
    while (i <= daysOfMonth) {
      this.days.push(i++);
    }
  }

  /**
   * on month selection, we will trigger the next focus based on the datePickerMode
   *
   * @param {string} selectedMonth the selected month
   * @memberof BmoNgDatePickerComponent
   */
  onMonthSelect(selectedMonth: string) {
    if (selectedMonth) {
      this.showMonths = false;
      this.selectedMonth = selectedMonth;
      this.headerMonthLabel = this.selectedMonth;
      this.showBackButton = true;
      if (this.datePickerMode === DATE_PICKER_MODE.FULL) {
        // reset days if selectedMonth and prevSelectedMonth does not match.
        if (selectedMonth !== this.prevSelectedMonth) {
          this.selectedDay = '';
        } else {
          this.selectedDay = this.prevSelectedDay;
        }
        this.showDays = true;
        this.getDaysOfMonth(this.selectedMonth, 0);
        this.setFocus('day');
      } else {
        this.showYears = true;
        this.setFocus('year');
      }
    }
  }

  /**
   * on day selection, we will trigger the next focus on year
   *
   * @param {string} val the selected day
   * @memberof BmoNgDatePickerComponent
   */
  onDaySelect(val) {
    if (val) {
      this.selectedDay = val;
      this.showDays = false;
      this.showYears = true;
      scrollToEl(this.elementRef, HEADER_PROGRESS_BAR_OFFSET, 155);
      this.setFocus('year');
    }
  }

  /**
   * on day selection and we click back, it will trigger the next focus on month
   *
   * @memberof BmoNgDatePickerComponent
   */
  onDayBackButtonClick() {
    this.showBackButton = false;
    this.showDays = false;
    this.showMonths = true;
    this.setFocus('month');
  }

  /**
   * On year selection and we click back, it will trigger the next focus on month or day based on datePickerMode
   *
   * @memberof BmoNgDatePickerComponent
   */
  onYearsBackButtonClick() {
    this.showYears = false;
    if (this.datePickerMode === DATE_PICKER_MODE.FULL) {
      this.showDays = true;
      this.setFocus('day');
    } else {
      this.showBackButton = false;
      this.showMonths = true;
      this.setFocus('month');
    }
  }

  /**
   * On year selection, set the year value and hide the date picker
   * @memberof BmoNgDatePickerComponent
   */
  onYearSelect(selecteYear: string) {
    if (selecteYear) {
      this.selectedYear = selecteYear;
      this.month.emit(this.selectedMonth);
      if (this.datePickerMode === DATE_PICKER_MODE.FULL) {
        this.day.emit(this.selectedDay);
      }
      this.year.emit(this.selectedYear);
      this.showYears = false;
      if (this.datePickerMode === DATE_PICKER_MODE.FULL) {
        this.showDays = true;
        this.setFocus('day');
      } else {
        this.showBackButton = false;
        this.showMonths = true;
        this.setFocus('month');
      }
      this.showDatePicker = false;
      this.showPickerEmitter.emit(this.showDatePicker);
    }
  }

  /**
   * set the years list in specific decade
   *
   * @param {number} decade
   * @returns
   * @memberof BmoNgDatePickerComponent
   */
  getYearsInDecade(decade: number) {
    this.years = [];
    if (typeof decade === 'undefined') {
      return;
    }

    const decadeYear = moment()
      .year(decade)
      .year();
    const currentDecade: any = Math.floor(decadeYear / 10) * 10;
    let decadeYearStart = currentDecade;
    this.decadeLabel = currentDecade;
    while (decadeYearStart <= currentDecade + 9) {
      this.years.push(decadeYearStart++);
    }
  }

  /**
   * shift back to the previous decade of current year
   *
   * @param {number} currentDecade
   * @memberof BmoNgDatePickerComponent
   */
  onDecadeBackButtonClick(currentDecade: number) {
    const previousDecade = currentDecade - 10;
    if (previousDecade >= this.minDecade) {
      this.getYearsInDecade(previousDecade);
    }
  }

  /**
   * shift to the next decade of current year
   *
   * @param {number} currentDecade
   * @memberof BmoNgDatePickerComponent
   */
  onDecadeNextButtonClick(currentDecade: number) {
    const nextDecade = currentDecade + 10;
    if (nextDecade <= this.maxDecade) {
      this.getYearsInDecade(nextDecade);
    }
  }

  /**
   * get current decade of this current year
   *
   * @returns number
   * @memberof BmoNgDatePickerComponent
   */
  getCurrentDecade(): number {
    return (this.maxDecade = Math.floor(moment().year() / 10) * 10);
  }

  /**
   * Check if the year value is a future year
   *
   * @param {number} year number of Year (e.g 2019)
   * @returns boolean
   * @memberof BmoNgDatePickerComponent
   */
  isFutureYear(year: number): boolean {
    return !this.showFutureDate && year > this.currentYear;
  }

  /**
   * check if it is equal to the minimum assigned decade
   *
   * @param {number} decade current decade
   * @returns boolean
   * @memberof BmoNgDatePickerComponent
   */
  isMinDecade(decade: number): boolean {
    if (this.minDecade === decade) {
      this.decadeBackImage =
        'common/assets/images/chevron-left-grey.svg';
      return true;
    } else {
      this.decadeBackImage = 'common/assets/images/chevron-left.svg';
      return false;
    }
  }

  /**
   * check if it is equal to the maximum assigned decade
   *
   * @param {number} decade current decade
   * @returns boolean
   * @memberof BmoNgDatePickerComponent
   */
  isMaxDecade(decade) {
    if (this.maxDecade === decade) {
      this.decadeNextImage =
        'common/assets/images/chevron-side-grey.svg';
      return true;
    } else {
      this.decadeNextImage =
        'common/assets/images/chevron-side-blue.svg';
      return false;
    }
  }

  /**
   * close the date picker and emit the event
   * set month, day, year to previous selected values
   *
   * @memberof BmoNgDatePickerComponent
   */
  onClose() {
    this.selectedMonth = this.prevSelectedMonth;
    this.selectedDay = this.prevSelectedDay;
    this.selectedYear = this.prevSelectedYear;
    this.showDatePicker = false;
    this.showPickerEmitter.emit(this.showDatePicker);
  }

  /**
   * clears the selected values
   *
   * @memberof BmoNgDatePickerComponent
   */
  clearDate() {
    this.selectedDay = '';
    this.selectedMonth = '';
    this.selectedYear = '';
  }

  /**
   * listen to the escape button event to close the date picker
   *
   * @param {KeyboardEvent} event
   * @memberof BmoNgDatePickerComponent
   */
  @HostListener('document:keyup.escape', ['$event'])
  onEscapeKeyHandler(event: KeyboardEvent) {
    event.stopPropagation();
    this.onClose();
  }

  /**
   * show and focus on the days section in the date picker
   *
   * @memberof BmoNgDatePickerComponent
   */
  showDaysPicker() {
    this.initializeDatePicker();
    this.showDatePicker = true;
    this.showMonths = false;
    this.showYears = false;
    this.showDays = true;
    this.showBackButton = true;
    this.setFocus('day');
  }

  /**
   * show and focus on the months section in the date picker
   *
   * @memberof BmoNgDatePickerComponent
   */
  showMonthsPicker() {
    this.initializeDatePicker();
    this.showDatePicker = true;
    this.showYears = false;
    this.showDays = false;
    this.showMonths = true;
    this.showBackButton = false;
    this.setFocus('month');
  }

  /**
   * show and focus on the years section in the date picker
   *
   * @memberof BmoNgDatePickerComponent
   */
  showYearsPicker() {
    this.initializeDatePicker();
    this.showDatePicker = true;
    this.showMonths = false;
    this.showDays = false;
    this.showYears = true;
    this.showBackButton = true;
    this.setFocus('year');
  }

  /**
   * set previous selected month, day and year
   *
   * @memberof BmoNgDatePickerComponent
   */
  initializeDatePicker() {
    this.prevSelectedMonth = this.selectedMonth;
    this.prevSelectedDay = this.selectedDay;
    this.prevSelectedYear = this.selectedYear;
    this.headerMonthLabel = this.selectedMonth || this.config.pickerMonthLabel;
    this.decadeSuffix = this.config.decadeSuffix;
    this.previousDecade = this.config.previousDecade;
  }
}
