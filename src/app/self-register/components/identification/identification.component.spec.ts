import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule, Action, Store } from '@ngrx/store';
import { APP_BASE_HREF } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import { TranslationService } from 'src/common/i18n/translation.service';
import { CommonModule } from 'src/common/common.module';
import { IdentificationComponent } from './identification.component';
import { reducers, AppState } from '../../../reducers';
import { DeviceInfoService } from 'src/common/services/device-info.service';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs';
import { mockStore } from 'src/common/helpers/test.providers';


describe('IdentificationComponent', () => {
  let component: IdentificationComponent;
  let fixture: ComponentFixture<IdentificationComponent>;
  let actions = new Subject<Action>();
  let states = new Subject<AppState>();
  let store = mockStore<AppState>({actions,states});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentificationComponent],
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) =>
              new TranslateHttpLoader(http, 'common/assets/i18n/', '.json'),
            deps: [HttpClient]
          }
        }),
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot(reducers),
        FormsModule
      ],
      providers: [
        FormBuilder,
        TranslationService,
        { provide: APP_BASE_HREF, useValue: '/' },
        DeviceInfoService,
        {provide:Store,useValue:store
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationComponent);
    component = fixture.componentInstance;
    
    
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set the selected date in the date field',() =>{
    let onDateChangeSpy = spyOn(component, 'onDateChange').and.callThrough();
    component.onDateChange('May 01, 2019');
    expect(component.newDateValue.text).toEqual('May 01, 2019')
  })
  it('should return false when on close method called',() =>{
    let onCopySpy = spyOn(component,'onCopy').and.callThrough();
    expect (component.onCopy('true')).toEqual(false);
    expect (onCopySpy).toHaveBeenCalledTimes(1);
  })
  it('should return false when on paste method called',() =>{
    let onPasteSpy = spyOn(component,'onPaste').and.callThrough();
    expect (component.onPaste('true')).toEqual(false);
    expect (onPasteSpy).toHaveBeenCalledTimes(1);
  })
  it('should return final valid business number without special characters',()=>{
    component.identificationFormGroup
    .controls['businessPhone'].setValue('(777) 888-9999');
    let formValues = component.getIdentificationFormValues();
    expect (formValues.businessPhone).toEqual('7778889999');
  })
  it('should return final valid phone number without special characters',()=>{
    component.identificationFormGroup
    .controls['businessPhone'].setValue('(333) 222-8888');
    let formValues = component.getIdentificationFormValues();
    expect (formValues.businessPhone).toEqual('3332228888');
  })
 
});
