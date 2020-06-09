import { BmoNgDatePickerModule } from './bmo-date-picker.module';
import {
  ComponentFixture,
  TestBed,
  getTestBed,
  async
} from '@angular/core/testing';

import {
  BmoNgDatePickerComponent,
  DATE_PICKER_MODE
} from './bmo-date-picker.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

describe('BmoNgDatePickerComponent', () => {
  let component: BmoNgDatePickerComponent;
  let fixture: ComponentFixture<BmoNgDatePickerComponent>;
  const appRoutes = [{ path: '', component: BmoNgDatePickerComponent }];
  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll(done =>
    (async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [BmoNgDatePickerModule, TranslateModule.forRoot()]
      });

      await TestBed.compileComponents();
      // prevent Angular from resetting testing module
      TestBed.resetTestingModule = () => TestBed;

      const injector = getTestBed();
      const translate = injector.get(TranslateService);
      translate.use('en');
    })()
      .then(done)
      .catch(done.fail)
  );

  afterAll(() => {
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmoNgDatePickerComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    let initializeMonthsPickerSpy;
    let initializeYearsPickerSpy;
    let initializeDaysOfMonthSpy;
    let getCurrentDecadeSpy;

    beforeEach(() => {
      // FIXME: this returnValue doesn't work for non-current year
      spyOn(moment(), 'year').and.returnValue(2019);
      initializeMonthsPickerSpy = spyOn(
        component,
        'initializeMonthsPicker'
      ).and.callThrough();

      initializeYearsPickerSpy = spyOn(
        component,
        'initializeYearsPicker'
      ).and.callThrough();

      initializeDaysOfMonthSpy = spyOn(
        component,
        'initializeDaysOfMonth'
      ).and.callThrough();

      getCurrentDecadeSpy = spyOn(component, 'getCurrentDecade')
        .and.returnValue(2010)
        .and.callThrough();

      component.ngOnInit();
    });

    afterEach(() => {
      initializeDaysOfMonthSpy.calls.reset();
      initializeYearsPickerSpy.calls.reset();
      initializeDaysOfMonthSpy.calls.reset();
    });

    it('should set currentYear to current year value', () => {
      expect(component.currentYear).toEqual(2019);
    });

    it('should getCurrentDecadeSpy recieved a call', () => {
      expect(getCurrentDecadeSpy).toHaveBeenCalledTimes(1);
    });

    it('should set maxDecade to current decade value', () => {
      expect(component.maxDecade).toEqual(2010);
    });

    it('should initializeMonthsPicker recieved a call', () => {
      expect(initializeMonthsPickerSpy).toHaveBeenCalledTimes(1);
    });

    it('should initializeYearsPicker recieved a call', () => {
      expect(initializeYearsPickerSpy).toHaveBeenCalledTimes(1);
    });

    it('should initializeDaysOfMonth recieved a call', () => {
      expect(initializeDaysOfMonthSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('initializeMonthsPicker', () => {
    let monthsShortSpy;

    beforeEach(() => {
      monthsShortSpy = spyOn(moment, 'monthsShort').and.callThrough();

      component.initializeMonthsPicker();
    });

    afterEach(() => {
      monthsShortSpy.calls.reset();
    });

    it('should set months to short month format', () => {
      expect(component.months).toEqual([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]);
    });

    it('should monthsShort recieved a call', () => {
      expect(monthsShortSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('initializeYearsPicker', () => {
    let getYearsInDecadeSpy;

    beforeEach(() => {
      getYearsInDecadeSpy = spyOn(component, 'getYearsInDecade').and.stub();
      component.maxDecade = 2010;
    });

    afterEach(() => {
      getYearsInDecadeSpy.calls.reset();
    });

    it('should getYearsInDecade recieved a call with current Max Decade value', () => {
      component.initializeYearsPicker();
      expect(getYearsInDecadeSpy).toHaveBeenCalledWith(2010);
    });

    it('should getYearsInDecade recieved a call with defaultDecade value', () => {
      component.defaultDecade = 1990;
      component.initializeYearsPicker();
      expect(getYearsInDecadeSpy).toHaveBeenCalledWith(1990);
    });

    it('should getYearsInDecade recieved a call with selectedYear value', () => {
      component.selectedYear = '1980';
      component.defaultDecade = 1990;
      component.initializeYearsPicker();
      expect(getYearsInDecadeSpy).toHaveBeenCalledWith(1980);
    });
  });

  describe('initializeDaysOfMonth', () => {
    let initializeDaysOfMonthSpy;

    beforeEach(() => {
      initializeDaysOfMonthSpy = spyOn(component, 'getDaysOfMonth')
        .and.stub()
        .and.returnValue(31);
      component.selectedMonth = 'Jul';

      component.initializeDaysOfMonth();
    });

    afterEach(() => {
      initializeDaysOfMonthSpy.calls.reset();
    });

    it('should getDaysOfMonth recieved a call with current selected Month value', () => {
      expect(initializeDaysOfMonthSpy).toHaveBeenCalledWith('Jul', 0);
    });
  });

  describe('getDaysOfMonth', () => {
    describe('When Month is given with 31 Days', () => {
      beforeEach(() => {
        component.days = [];
        component.getDaysOfMonth('Jul', 2018);
      });

      it('should return the correct number of days for the given month', () => {
        expect(component.days).toEqual([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31
        ]);
      });
    });

    describe('When Month is given with 30 Days', () => {
      beforeEach(() => {
        component.days = [];
        component.getDaysOfMonth('June', 2018);
      });

      it('should return the correct number of days for the given month', () => {
        expect(component.days).toEqual([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30
        ]);
      });
    });

    describe('When Month is given with 28 Days', () => {
      beforeEach(() => {
        component.days = [];
        component.getDaysOfMonth('Feb', 2018);
      });

      it('should return the correct number of days for the given month', () => {
        expect(component.days).toEqual([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28
        ]);
      });
    });

    describe('When Month is given with 29 Days', () => {
      beforeEach(() => {
        component.days = [];
        component.getDaysOfMonth('Feb', 2016);
      });

      it('should return the correct number of days for the given month', () => {
        expect(component.days).toEqual([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29
        ]);
      });
    });

    describe('When month/year is not given', () => {
      beforeEach(() => {
        component.days = [];
        component.getDaysOfMonth(undefined, undefined);
      });

      it('should return the correct number of days for the given month', () => {
        expect(component.days).toEqual([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31
        ]);
      });
    });
  });

  describe('onMonthSelect:', () => {
    beforeEach(() => {
      component.selectedMonth = '';
      component.headerMonthLabel = '';
      component.showBackButton = false;
      component.showMonths = true;
      component.showDays = false;
      component.showYears = false;
    });

    describe('When no value passed', () => {
      beforeEach(() => {
        component.onMonthSelect(undefined);
      });

      it('should not set selectedMonth', () => {
        expect(component.selectedMonth).toEqual('');
      });

      it('should not set headerMonthLabel', () => {
        expect(component.headerMonthLabel).toEqual('');
      });

      it('should not set showBackButton', () => {
        expect(component.showBackButton).toBeFalsy();
      });

      it('should not set showMonths', () => {
        expect(component.showMonths).toBeTruthy();
      });

      it('should not set showDays', () => {
        expect(component.showDays).toBeFalsy();
      });

      it('should not set showYears', () => {
        expect(component.showYears).toBeFalsy();
      });
    });

    describe('When a value passed with Full Picker Mode', () => {
      beforeEach(() => {
        component.datePickerMode = DATE_PICKER_MODE.FULL;
        component.onMonthSelect('Jul');
      });

      it('should set selectedMonth', () => {
        expect(component.selectedMonth).toEqual('Jul');
      });

      it('should set headerMonthLabel', () => {
        expect(component.headerMonthLabel).toEqual('Jul');
      });

      it('should set showBackButton', () => {
        expect(component.showBackButton).toBeTruthy();
      });

      it('should set showMonths', () => {
        expect(component.showMonths).toBeFalsy();
      });

      it('should set showDays', () => {
        expect(component.showDays).toBeTruthy();
      });

      it('should set showYears', () => {
        expect(component.showYears).toBeFalsy();
      });
    });

    describe('When a value passed with Part Picker Mode', () => {
      beforeEach(() => {
        component.datePickerMode = DATE_PICKER_MODE.PART;
        component.onMonthSelect('Jul');
      });

      it('should set selectedMonth', () => {
        expect(component.selectedMonth).toEqual('Jul');
      });

      it('should set headerMonthLabel', () => {
        expect(component.headerMonthLabel).toEqual('Jul');
      });

      it('should set showBackButton', () => {
        expect(component.showBackButton).toBeTruthy();
      });

      it('should set showMonths', () => {
        expect(component.showMonths).toBeFalsy();
      });

      it('should set showDays', () => {
        expect(component.showDays).toBeFalsy();
      });

      it('should set showYears', () => {
        expect(component.showYears).toBeTruthy();
      });
    });

    describe('When selectedMonth is equal to prevSelectedMonth', () => {
      it('should set selectedDay from prevSelectedDay', () => {
        component.prevSelectedMonth = 'May';
        component.prevSelectedDay = '19';
        component.datePickerMode = DATE_PICKER_MODE.FULL;
        component.onMonthSelect('May');

        expect(component.selectedDay).toEqual('19');
      });
    });
  });

  describe('onDaySelect:', () => {
    beforeEach(() => {
      component.selectedDay = '';
      component.showDays = true;
      component.showYears = false;

      component.onDaySelect('10');
    });

    it('should set selectedDay', () => {
      expect(component.selectedDay).toEqual('10');
    });

    it('should set showDays', () => {
      expect(component.showDays).toBeFalsy();
    });

    it('should not set showYears', () => {
      expect(component.showYears).toBeTruthy();
    });
  });

  describe('onDayBackButtonClick', () => {
    beforeEach(() => {
      component.showBackButton = true;
      component.showDays = true;
      component.showMonths = false;

      component.onDayBackButtonClick();
    });

    it('should set showBackButton', () => {
      expect(component.showBackButton).toBeFalsy();
    });

    it('should set showDays', () => {
      expect(component.showDays).toBeFalsy();
    });

    it('should not set showMonths', () => {
      expect(component.showMonths).toBeTruthy();
    });
  });

  describe('onYearsBackButtonClick', () => {
    beforeEach(() => {
      component.showBackButton = true;
      component.showDays = false;
      component.showMonths = false;
      component.showYears = true;
    });

    describe('when picker mode is Full', () => {
      beforeEach(() => {
        component.datePickerMode = DATE_PICKER_MODE.FULL;
        component.onYearsBackButtonClick();
      });

      it('should set showBackButton', () => {
        expect(component.showBackButton).toBeTruthy();
      });

      it('should set showDays', () => {
        expect(component.showDays).toBeTruthy();
      });

      it('should not set showMonths', () => {
        expect(component.showMonths).toBeFalsy();
      });

      it('should not set showYears', () => {
        expect(component.showYears).toBeFalsy();
      });
    });

    describe('when picker mode is Part', () => {
      beforeEach(() => {
        component.datePickerMode = DATE_PICKER_MODE.PART;
        component.onYearsBackButtonClick();
      });

      it('should set showBackButton', () => {
        expect(component.showBackButton).toBeFalsy();
      });

      it('should set showDays', () => {
        expect(component.showDays).toBeFalsy();
      });

      it('should not set showMonths', () => {
        expect(component.showMonths).toBeTruthy();
      });

      it('should not set showYears', () => {
        expect(component.showYears).toBeFalsy();
      });
    });
  });

  describe('onYearSelect:', () => {
    beforeEach(() => {
      component.selectedYear = '';
      component.showYears = true;
      component.showDays = false;
      component.showBackButton = true;
      component.showMonths = false;
      component.showDatePicker = true;
    });

    describe('when no value passed', () => {
      beforeEach(() => {
        component.onYearSelect(undefined);
      });

      it('should not set selectedYear', () => {
        expect(component.selectedYear).toEqual('');
      });

      it('should not set showBackButton', () => {
        expect(component.showBackButton).toBeTruthy();
      });

      it('should not set showDays', () => {
        expect(component.showDays).toBeFalsy();
      });

      it('should not set showMonths', () => {
        expect(component.showMonths).toBeFalsy();
      });

      it('should not set showYears', () => {
        expect(component.showYears).toBeTruthy();
      });

      it('should not set showDatePicker', () => {
        expect(component.showDatePicker).toBeTruthy();
      });
    });

    describe('when value passed with Full picker mode', () => {
      beforeEach(() => {
        component.datePickerMode = DATE_PICKER_MODE.FULL;
        component.onYearSelect('2018');
      });

      it('should set selectedYear', () => {
        expect(component.selectedYear).toEqual('2018');
      });

      it('should set showYears', () => {
        expect(component.showYears).toBeFalsy();
      });

      it('should set showDays', () => {
        expect(component.showDays).toBeTruthy();
      });

      it('should set showBackButton', () => {
        expect(component.showBackButton).toBeTruthy();
      });

      it('should set showMonths', () => {
        expect(component.showMonths).toBeFalsy();
      });

      it('should set showDatePicker', () => {
        expect(component.showDatePicker).toBeFalsy();
      });
    });

    describe('when value passed with Part picker mode', () => {
      beforeEach(() => {
        component.datePickerMode = DATE_PICKER_MODE.PART;
        component.onYearSelect('2018');
      });

      it('should set selectedYear', () => {
        expect(component.selectedYear).toEqual('2018');
      });

      it('should set showYears', () => {
        expect(component.showYears).toBeFalsy();
      });

      it('should set showDays', () => {
        expect(component.showDays).toBeFalsy();
      });

      it('should set showBackButton', () => {
        expect(component.showBackButton).toBeFalsy();
      });

      it('should set showMonths', () => {
        expect(component.showMonths).toBeTruthy();
      });

      it('should set showDatePicker', () => {
        expect(component.showDatePicker).toBeFalsy();
      });
    });
  });

  describe('getYearsInDecade:', () => {
    beforeEach(() => {
      component.years = [];
      component.defaultDecade = 0;
      component.decadeLabel = 0;
    });

    describe('when no value passed', () => {
      beforeEach(() => {
        component.getYearsInDecade(undefined);
      });

      it('should not set years', () => {
        expect(component.years).toEqual([]);
      });

      it('should not set defaultDecade', () => {
        expect(component.defaultDecade).toEqual(0);
      });

      it('should not set decadeLabel', () => {
        expect(component.decadeLabel).toEqual(0);
      });
    });

    describe('when a decade value passed', () => {
      beforeEach(() => {
        component.getYearsInDecade(2010);
      });

      it('should set years to the correct value', () => {
        expect(component.years).toEqual([
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018,
          2019
        ]);
      });

      it('should set decadeLabel', () => {
        expect(component.decadeLabel).toEqual(2010);
      });

      it('should set decadeLabel', () => {
        expect(component.decadeLabel).toEqual(2010);
      });
    });
  });

  describe('onDecadeBackButtonClick:', () => {
    let getYearsInDecadeSpy;

    beforeEach(() => {
      getYearsInDecadeSpy = spyOn(
        component,
        'getYearsInDecade'
      ).and.callThrough();
    });

    afterEach(() => {
      getYearsInDecadeSpy.calls.reset();
    });

    describe('when called with no param', () => {
      beforeEach(() => {
        component.years = [];
        component.onDecadeBackButtonClick(undefined);
      });

      it('should not call getYearsInDecade', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledTimes(0);
      });

      it('should not set years', () => {
        expect(component.years).toEqual([]);
      });
    });

    describe('when called with a parameter smaller than minDecade', () => {
      beforeEach(() => {
        component.years = [];
        component.minDecade = 2000;
        component.onDecadeBackButtonClick(1990);
      });

      it('should not call getYearsInDecade', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledTimes(0);
      });

      it('should not set years', () => {
        expect(component.years).toEqual([]);
      });
    });

    describe('when called with a parameter largers than minDecade', () => {
      beforeEach(() => {
        component.minDecade = 2000;
        component.onDecadeBackButtonClick(2010);
      });

      it('should call getYearsInDecade', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledTimes(1);
      });

      it('should call getYearsInDecade with the passed parameter - 10', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledWith(2000);
      });

      it('should set years to correct value', () => {
        expect(component.years).toEqual([
          2000,
          2001,
          2002,
          2003,
          2004,
          2005,
          2006,
          2007,
          2008,
          2009
        ]);
      });
    });
  });

  describe('onDecadeNextButtonClick:', () => {
    let getYearsInDecadeSpy;

    beforeEach(() => {
      component.years = [];
      getYearsInDecadeSpy = spyOn(
        component,
        'getYearsInDecade'
      ).and.callThrough();
    });

    afterEach(() => {
      getYearsInDecadeSpy.calls.reset();
    });

    describe('when called with no param', () => {
      beforeEach(() => {
        component.onDecadeNextButtonClick(undefined);
      });

      it('should not call getYearsInDecade', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledTimes(0);
      });

      it('should not set years', () => {
        expect(component.years).toEqual([]);
      });
    });

    describe('when called with a parameter larger than maxDecade', () => {
      beforeEach(() => {
        component.maxDecade = 1990;
        getYearsInDecadeSpy.calls.reset();
        component.onDecadeNextButtonClick(2000);
      });

      it('should not call getYearsInDecade', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledTimes(0);
      });

      it('should not set years', () => {
        expect(component.years).toEqual([]);
      });
    });

    describe('when called with a parameter smaller than maxDecade', () => {
      beforeEach(() => {
        component.maxDecade = 2050;
        getYearsInDecadeSpy.calls.reset();
        component.onDecadeNextButtonClick(2000);
      });

      it('should call getYearsInDecade', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledTimes(1);
      });

      it('should call getYearsInDecade with the passed parameter + 10', () => {
        expect(getYearsInDecadeSpy).toHaveBeenCalledWith(2010);
      });

      it('should set years to correct value', () => {
        expect(component.years).toEqual([
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018,
          2019
        ]);
      });
    });
  });

  describe('getCurrentDecade', () => {
    let currentDecade: number;
    let momentYearSpy;

    beforeEach(() => {
      momentYearSpy = spyOn(moment(), 'year')
        .and.stub()
        .and.returnValue(2018);
      currentDecade = component.getCurrentDecade();
    });

    afterEach(() => {
      momentYearSpy.calls.reset();
    });

    it('should return the correct current decade', () => {
      expect(currentDecade).toEqual(2010);
    });

    it('should set maxDEcade to the correct current decade', () => {
      expect(component.maxDecade).toEqual(2010);
    });
  });

  describe('isFutureYear', () => {
    let isFutureYearReturnedValue: Boolean;

    describe('when input year is earlier than current', () => {
      beforeEach(() => {
        component.currentYear = 2018;
        isFutureYearReturnedValue = component.isFutureYear(2010);
      });

      it('should return false', () => {
        expect(isFutureYearReturnedValue).toBeFalsy();
      });
    });

    describe('when input year is later than current', () => {
      beforeEach(() => {
        component.currentYear = 2018;
        isFutureYearReturnedValue = component.isFutureYear(2020);
      });

      it('should return false', () => {
        expect(isFutureYearReturnedValue).toBeTruthy();
      });
    });

    describe('when input year is equal to current', () => {
      beforeEach(() => {
        component.currentYear = 2018;
        isFutureYearReturnedValue = component.isFutureYear(2018);
      });

      it('should return false', () => {
        expect(isFutureYearReturnedValue).toBeFalsy();
      });
    });

    describe('when input year is invalid', () => {
      beforeEach(() => {
        component.currentYear = 2018;
        isFutureYearReturnedValue = component.isFutureYear(-10);
      });

      it('should return false', () => {
        expect(isFutureYearReturnedValue).toBeFalsy();
      });
    });

    describe('when input year isundefined', () => {
      beforeEach(() => {
        component.currentYear = 2018;
        isFutureYearReturnedValue = component.isFutureYear(undefined);
      });

      it('should return false', () => {
        expect(isFutureYearReturnedValue).toBeFalsy();
      });
    });
  });

  describe('isMinDecade:', () => {
    let isMinDecadeReturnedValue: Boolean;

    describe('when input decade is earlier than current minDecade', () => {
      beforeEach(() => {
        component.minDecade = 2000;
        isMinDecadeReturnedValue = component.isMinDecade(1990);
      });

      it('should return false', () => {
        expect(isMinDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeBackImage).toEqual(
          'assets/design-system/images/chevron-left.svg'
        );
      });
    });

    describe('when input decade is later than current minDecade', () => {
      beforeEach(() => {
        component.minDecade = 2000;
        isMinDecadeReturnedValue = component.isMinDecade(2010);
      });

      it('should return false', () => {
        expect(isMinDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeBackImage).toEqual(
          'assets/design-system/images/chevron-left.svg'
        );
      });
    });

    describe('when input decade is equal than current minDecade', () => {
      beforeEach(() => {
        component.minDecade = 2000;
        isMinDecadeReturnedValue = component.isMinDecade(2000);
      });

      it('should return True', () => {
        expect(isMinDecadeReturnedValue).toBeTruthy();
      });

      it('should set correct image source', () => {
        expect(component.decadeBackImage).toEqual(
          'assets/design-system/images/chevron-left-grey.svg'
        );
      });
    });

    describe('when input year is invalid', () => {
      beforeEach(() => {
        component.minDecade = 2010;
        isMinDecadeReturnedValue = component.isMinDecade(-10);
      });

      it('should return false', () => {
        expect(isMinDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeBackImage).toEqual(
          'assets/design-system/images/chevron-left.svg'
        );
      });
    });

    describe('when input year isundefined', () => {
      beforeEach(() => {
        component.currentYear = 2010;
        isMinDecadeReturnedValue = component.isMinDecade(undefined);
      });

      it('should return false', () => {
        expect(isMinDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeBackImage).toEqual(
          'assets/design-system/images/chevron-left.svg'
        );
      });
    });
  });

  describe('isMaxDecade:', () => {
    let isMaxDecadeReturnedValue: Boolean;

    describe('when input decade is earlier than current maxDecade', () => {
      beforeEach(() => {
        component.maxDecade = 2000;
        isMaxDecadeReturnedValue = component.isMaxDecade(1990);
      });

      it('should return false', () => {
        expect(isMaxDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeNextImage).toEqual(
          'assets/design-system/images/chevron-side-blue.svg'
        );
      });
    });

    describe('when input decade is later than current maxDecade', () => {
      beforeEach(() => {
        component.maxDecade = 2000;
        isMaxDecadeReturnedValue = component.isMaxDecade(2010);
      });

      it('should return false', () => {
        expect(isMaxDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeNextImage).toEqual(
          'assets/design-system/images/chevron-side-blue.svg'
        );
      });
    });

    describe('when input decade is equal than current maxDecade', () => {
      beforeEach(() => {
        component.maxDecade = 2000;
        isMaxDecadeReturnedValue = component.isMaxDecade(2000);
      });

      it('should return True', () => {
        expect(isMaxDecadeReturnedValue).toBeTruthy();
      });

      it('should set correct image source', () => {
        expect(component.decadeNextImage).toEqual(
          'assets/design-system/images/chevron-side-grey.svg'
        );
      });
    });

    describe('when input year is invalid', () => {
      beforeEach(() => {
        component.maxDecade = 2010;
        isMaxDecadeReturnedValue = component.isMaxDecade(-10);
      });

      it('should return false', () => {
        expect(isMaxDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeNextImage).toEqual(
          'assets/design-system/images/chevron-side-blue.svg'
        );
      });
    });

    describe('when input year isundefined', () => {
      beforeEach(() => {
        component.maxDecade = 2010;
        isMaxDecadeReturnedValue = component.isMaxDecade(undefined);
      });

      it('should return false', () => {
        expect(isMaxDecadeReturnedValue).toBeFalsy();
      });

      it('should set correct image source', () => {
        expect(component.decadeNextImage).toEqual(
          'assets/design-system/images/chevron-side-blue.svg'
        );
      });
    });
  });

  describe('onClose', () => {
    beforeEach(() => {
      component.prevSelectedMonth = 'May';
      component.prevSelectedDay = '19';
      component.prevSelectedYear = '2019';
      component.showDatePicker = true;
      component.onClose();
    });
    it('should reset selectedMonth', () => {
      expect(component.selectedMonth).toEqual('May');
    });
    it('should reset selectedDay', () => {
      expect(component.selectedDay).toEqual('19');
    });
    it('should reset selectedYear', () => {
      expect(component.selectedYear).toEqual('2019');
    });
    it('should set showDatePicker to false', () => {
      expect(component.showDatePicker).toBeFalsy();
    });
  });

  describe('clearDate', () => {
    beforeEach(() => {
      component.selectedMonth = 'May';
      component.selectedDay = '19';
      component.selectedYear = '2019';
      component.clearDate();
    });
    it('should clear selectedMonth', () => {
      expect(component.selectedMonth).toEqual('');
    });
    it('should clear selectedDay', () => {
      expect(component.selectedDay).toEqual('');
    });
    it('should clear selectedYear', () => {
      expect(component.selectedYear).toEqual('');
    });
  });

  describe('showDaysPicker', () => {
    let mockInitializeDatePicker;

    beforeEach(() => {
      component.showDatePicker = false;
      component.showMonths = true;
      component.showYears = true;
      component.showDays = false;
      component.showBackButton = false;
      mockInitializeDatePicker = spyOn(
        component,
        'initializeDatePicker'
      ).and.stub();

      component.showDaysPicker();
    });

    it('should call initializeDatePicker', () => {
      expect(mockInitializeDatePicker).toHaveBeenCalled();
    });

    it('should set showDatePicker', () => {
      expect(component.showDatePicker).toBeTruthy();
    });

    it('should set showMonths', () => {
      expect(component.showMonths).toBeFalsy();
    });

    it('should set showYears', () => {
      expect(component.showYears).toBeFalsy();
    });

    it('should set showDays', () => {
      expect(component.showDays).toBeTruthy();
    });

    it('should set showBackButton', () => {
      expect(component.showBackButton).toBeTruthy();
    });
  });

  describe('showMonthsPicker', () => {
    let mockInitializeDatePicker;
    beforeEach(() => {
      component.showDatePicker = false;
      component.showMonths = false;
      component.showYears = true;
      component.showDays = true;
      component.showBackButton = true;
      mockInitializeDatePicker = spyOn(
        component,
        'initializeDatePicker'
      ).and.stub();

      component.showMonthsPicker();
    });

    it('should call initializeDatePicker', () => {
      expect(mockInitializeDatePicker).toHaveBeenCalled();
    });

    it('should set showDatePicker', () => {
      expect(component.showDatePicker).toBeTruthy();
    });

    it('should set showMonths', () => {
      expect(component.showMonths).toBeTruthy();
    });

    it('should set showYears', () => {
      expect(component.showYears).toBeFalsy();
    });

    it('should set showDays', () => {
      expect(component.showDays).toBeFalsy();
    });

    it('should set showBackButton', () => {
      expect(component.showBackButton).toBeFalsy();
    });
  });

  describe('showYearsPicker', () => {
    let mockInitializeDatePicker;
    beforeEach(() => {
      component.showDatePicker = false;
      component.showMonths = true;
      component.showYears = false;
      component.showDays = true;
      component.showBackButton = false;
      mockInitializeDatePicker = spyOn(
        component,
        'initializeDatePicker'
      ).and.stub();

      component.showYearsPicker();
    });

    it('should call initializeDatePicker', () => {
      expect(mockInitializeDatePicker).toHaveBeenCalled();
    });

    it('should set showDatePicker', () => {
      expect(component.showDatePicker).toBeTruthy();
    });

    it('should set showMonths', () => {
      expect(component.showMonths).toBeFalsy();
    });

    it('should set showYears', () => {
      expect(component.showYears).toBeTruthy();
    });

    it('should set showDays', () => {
      expect(component.showDays).toBeFalsy();
    });

    it('should set showBackButton', () => {
      expect(component.showBackButton).toBeTruthy();
    });
  });

  describe('showYearsPicker', () => {
    beforeEach(() => {
      component.selectedMonth = 'May';
      component.selectedDay = '15';
      component.selectedYear = '2019';

      component.initializeDatePicker();
    });

    it('should set prevSelectedMonth to correct value', () => {
      expect(component.prevSelectedMonth).toEqual('May');
    });

    it('should set prevSelectedDay to correct value', () => {
      expect(component.prevSelectedDay).toEqual('15');
    });

    it('should set prevSelectedYear to correct value', () => {
      expect(component.prevSelectedYear).toEqual('2019');
    });

    it('should set headerMonthLabel to correct value', () => {
      expect(component.headerMonthLabel).toEqual('May');
    });
  });
});
