import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {selfRegisterRoutes} from './self-register.routes';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AccountDetailsComponent} from './components/account-details/account-details.component';
import {IdentificationComponent} from './components/identification/identification.component';
import {PasswordComponent} from './components/password/password.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {reducer as selfRegReducer} from './state-management/reducers/self.register.reducer';
import {SelfRegEffects} from './state-management/effects/self.register.effects';
import {SelfRegisterService} from './services/self.register.serivce';
import {CommonModule as Common} from '../../common/common.module';
import {SelfRegisterPageComponent} from './self-register-page.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    RouterModule.forChild(selfRegisterRoutes),
    StoreModule.forFeature('selfRegister', selfRegReducer),
    EffectsModule.forFeature([SelfRegEffects]),
    Common,
    TextMaskModule,
  ],
  declarations: [
    SelfRegisterPageComponent,
    WelcomeComponent,
    AccountDetailsComponent,
    IdentificationComponent,
    PasswordComponent,
    ConfirmationComponent
  ],
  exports: [
    SelfRegisterPageComponent,
    WelcomeComponent,
    AccountDetailsComponent,
    IdentificationComponent,
    PasswordComponent,
    ConfirmationComponent
  ]
})

export class SelfRegisterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelfRegisterModule,
      providers: [
        SelfRegisterService,
        // SelfRegisterGuard
      ]
    };
  }
}
