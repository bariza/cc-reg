import { NgModule } from '@angular/core';

import { MaterialImportModule } from './material-design-imports/material-import.module';
import { ComponentsModule } from './components/component.module';

//import { SelfRegisterService } from './services/self.register.serivce';
import { TranslationService, TranslationAppConfig, TRANSLATE_PROVIDERS } from './i18n/translation.service';

//import { ShowHideInputDirective } from 'common/directives/show-hide-password';
//import { FooterPositionService } from './services/footer-position.service';
//import { LocalStorageService } from './services/local-storage.service';
//import { DeviceInfoService } from './services/device-info.service';
//import { TimeoutDialogService } from './services/timeout-popup.service';
//import { TimerComponent } from '../app/timer/components/timer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {CustomHttpInterceptorService} from './services/custom-http-interceptor.service';
import {DirectivesModule} from './directives/directives.module';


const modules = [
  MaterialImportModule,
  ComponentsModule,
  TranslateModule,
  DirectivesModule
];

@NgModule({
  providers: [
    CustomHttpInterceptorService,
    TranslationService,
    TranslateService,
    ...TRANSLATE_PROVIDERS,
  ],
  imports: [
    ...modules,
    TranslationAppConfig,
  ],
  exports: [
  //  ShowHideInputDirective,
    ...modules
  ],
  declarations: [
  //  ShowHideInputDirective,
  ],
  entryComponents: [
  //  TimerComponent
  ]
})
export class CommonModule {}
