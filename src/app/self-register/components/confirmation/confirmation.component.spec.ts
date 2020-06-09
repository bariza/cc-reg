import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { APP_BASE_HREF } from '@angular/common';

import { TranslationService } from '../../../../common/i18n/translation.service';
import { CommonModule } from '../../../../common/common.module';
import { ConfirmationComponent } from './confirmation.component';
import { reducers } from '../../../reducers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmationComponent
      ],
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'common/assets/i18n/', '.json'),
            deps: [HttpClient]
          }
        }),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot(reducers),
      ],
      providers: [
        TranslationService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
