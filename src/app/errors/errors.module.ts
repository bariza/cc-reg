import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ErrorEffects } from './state-management/error.effects';
import { CommonModule } from '../../common/common.module';
import { ErrorComponent } from './components/error.component';
import { TranslationService, TranslationAppConfig } from '../../common/i18n/translation.service';
import {StoreModule} from '@ngrx/store';
import {reducer as errorReducer} from './state-management/error.reducer';
import {RouterModule} from '@angular/router';
import {errorRoutes} from './errors.routes';


/**
 * Error handling module
 * @export
 * @class ErrorModule
 */
@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TranslationAppConfig,
    EffectsModule.forFeature([ErrorEffects]),
    StoreModule.forFeature('errors', errorReducer),
    RouterModule.forChild(errorRoutes),
  ],
  exports: [
    ErrorComponent
  ]
})

export class ErrorsModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: ErrorsModule,
      providers: [
        TranslationService
      ]
    }
  }
}
