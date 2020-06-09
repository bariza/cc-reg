import { Routes } from '@angular/router';

import { PasswordComponent } from './components/password/password.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

export const selfRegisterRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'account-details',
    component: AccountDetailsComponent
  },
  {
    path: 'identification',
    component: IdentificationComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },

];
