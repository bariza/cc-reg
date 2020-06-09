import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { BmoNgPickerInputComponent } from './bmo-date-picker-input';
import { BmoNgDatePickerInputModule } from './bmo-date-picker-input.module';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('BmoNgPickerInputComponent', () => {
  let component: BmoNgPickerInputComponent;
  let fixture: ComponentFixture<BmoNgPickerInputComponent>;
  const appRoutes = [{ path: '', component: BmoNgPickerInputComponent }];
  let translate: TranslateService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BmoNgDatePickerInputModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes(appRoutes)
      ]
    }).compileComponents();

    const injector = getTestBed();
    translate = injector.get(TranslateService);
    translate.use('en');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmoNgPickerInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create Child View BmoNgPickerInputComponent', () => {
    expect(component.datePicker).toBeTruthy();
  });

  describe('OnInit', () => {
    beforeEach(() => {
      component.month = '07';
      component.ngOnInit();
    });

    it('should set month to correct format', () => {
      expect(component.month).toEqual('07');
    });
  });

  describe('onClickShow', () => {
    let showMonthsPickerSpy;

    beforeEach(() => {
      showMonthsPickerSpy = spyOn(
        component.datePicker,
        'showMonthsPicker'
      ).and.callThrough();
      component.onClickShow();
    });
    afterEach(() => {
      showMonthsPickerSpy.calls.reset();
    });

    it('should set showPicker to true', () => {
      expect(component.showPicker).toBeTruthy();
    });

    it('should set dateSelected to false', () => {
      expect(component.dateSelected).toBeFalsy();
    });

    it('should showMonthSpy recieved a call', () => {
      expect(component.datePicker.showMonthsPicker).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMonthSelect:', () => {
    beforeEach(() => {
      component.onMonthSelect('Oct');
    });

    it('should set month to the recieved value', () => {
      expect(component.month).toEqual('Oct');
    });

  });

  describe('onDaySelect:', () => {
    beforeEach(() => {
      component.onDaySelect('1');
    });

    it('should set Day to the received value', () => {
      expect(component.day).toEqual('01');
    });

  });

  describe('onYearSelect:', () => {
    beforeEach(() => {
      component.onYearSelect('2019');
    });

    it('should set Year to the recieved value', () => {
      expect(component.year).toEqual('2019');
    });

  });

  describe('onValueChange:', () => {
    let field: FormControl;
    beforeEach(() => {
      const fb = new FormBuilder();
      field = new FormControl(
        {
          value: 'some-value',
          disabled: false
        },
        []
      );
      component.datePickerControl = 'date-picker';
      const controlName = component.datePickerControl;
      component.parentFormGroup = fb.group({});
      component.parentFormGroup.addControl(controlName, field);
      component.onValueChange();
    });

    it('should set dateSelected to true', () => {
      expect(component.dateSelected).toBeTruthy();
    });
  });


});
