import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { APP_BASE_HREF } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import { TranslationService, TranslationAppConfig, TRANSLATE_PROVIDERS } from 'src/common/i18n/translation.service';
import { CommonModule } from 'src/common/common.module';
import { PasswordComponent } from './password.component';
import { reducers } from '../../../reducers';
import { DeviceInfoService } from 'src/common/services/device-info.service';
import { LocalStorageService } from 'src/common/services/local-storage.service';
import { TranslationsOB } from 'src/common/i18n/translationsob';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        TranslationAppConfig,
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        DeviceInfoService,
        TRANSLATE_PROVIDERS,
        LocalStorageService,
        TranslationsOB,
        TranslateService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
