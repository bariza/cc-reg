import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '../common/common.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer as selfRegReducer } from './self-register/state-management/reducers/self.register.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslationService } from 'src/common/i18n/translation.service';
import { LocalStorageService } from 'src/common/services/local-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceInfoService } from 'src/common/services/device-info.service';
import {SelfRegisterModule} from './self-register/self-register.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {reducers, metaReducers} from './reducers';
import {CustomHttpInterceptorService} from '../common/services/custom-http-interceptor.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ErrorsModule} from './errors/errors.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ErrorsModule,
    HttpClientModule,
    SelfRegisterModule.forRoot(),
    ErrorsModule.forChild(),
    StoreModule.forRoot(selfRegReducer),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    AppRoutingModule,
  ],
  providers: [
    DeviceInfoService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true},
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
/**
   * Creates an instance of AppModule.
   * @param {TranslationService} translateService the translation service
   * @memberOf AppModule
   */
export class AppModule {
  constructor(
    private translateService: TranslationService,
    private localStorageService: LocalStorageService,
  ){
    this.translateService.initialize();
    this.localStorageService.initialize();
  }
}

