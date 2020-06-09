import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundButtonComponent } from './button/round-button/round-button.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslationAppConfig, TranslationService } from '../i18n/translation.service';
import { LocalStorageService } from '../services/local-storage.service';
import {FooterPositionService} from '../services/footer-position.service'
import { MaterialImportModule } from '../material-design-imports/material-import.module';
import { RouterModule } from '@angular/router';
import {InfoTextComponent} from './infotext/info-text.component'
import { TooltipComponent } from './tooltip/tooltip.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InlineErrorComponent } from './inline-error/inline-error.component';
import {BmoNgPickerInputComponent} from './date-picker/date-picker-input/bmo-date-picker-input';
import {BmoNgDatePickerComponent} from './date-picker/bmo-date-picker.component';
import {BmoNgDatePickerConfig} from './date-picker/bmo-date-picker.config';
import {BmoNgDatePickerInputConfig} from './date-picker/date-picker-input/bmo-date-picker-input.config';
import {TextInputComponent} from './text-input/text-input.component';
import {DirectivesModule} from '../directives/directives.module';
import {InputTrimModule} from 'ng2-trim-directive';

const components = [
  RoundButtonComponent,
  FooterComponent,
  NavbarComponent,
  TextInputComponent,
  TooltipComponent,
  InfoTextComponent,
  InlineErrorComponent,
  BmoNgPickerInputComponent,
  BmoNgDatePickerComponent
];

@NgModule({
  providers: [
    TranslationService,
    LocalStorageService,
    FooterPositionService,
    BmoNgDatePickerConfig,
    BmoNgDatePickerInputConfig
  ],
  imports: [
    MaterialImportModule,
    TranslationAppConfig,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DirectivesModule,
    InputTrimModule
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...components
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
