import {AccountDetailsComponent} from './account-details.component';
import {ComponentFixture, async, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {CommonModule} from 'src/common/common.module';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {reducers} from 'src/app/reducers';
import {TranslationService} from 'src/common/i18n/translation.service';
import {APP_BASE_HREF} from '@angular/common';
import {DeviceInfoService} from '../../../../common/services/device-info.service';


describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailsComponent],
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
        StoreModule.forRoot(reducers)
      ],
      providers: [TranslationService, {provide: APP_BASE_HREF, useValue: '/'}, DeviceInfoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
