import { TranslationService, TranslationAppConfig, TRANSLATE_PROVIDERS } from 'src/common/i18n/translation.service';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import {
  TranslateModule, TranslateLoader, TranslateService,
  TranslateParser, TranslateDefaultParser, MissingTranslationHandler, MissingTranslationHandlerParams
} from '@ngx-translate/core';
import { LocalStorageService, Keys } from '../services/local-storage.service';
import { TranslationsOB } from './translationsob';

describe('TranslationService', () => {
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslationAppConfig,
      ],
      providers: [
        TranslationService,
        TRANSLATE_PROVIDERS,
        LocalStorageService,
        TranslationsOB,
        TranslateService,
      ]
    });
  });

  it('should be created', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
  }));

  it('should be initialized',  inject([TranslationService], (service: TranslationService) => {
    expect(service.initialize());
  }));

  it('test english translation',  inject([TranslationsOB, TranslateService], (translations: TranslationsOB, service: TranslateService) => {
    service.setDefaultLang('en');
    expect(service.instant(translations.KEY.CCREG.WELCOME.TITLE)).toEqual("Get started with online and mobile banking");
  }));

  it('test french translation',  inject([TranslationsOB, TranslateService], (translations: TranslationsOB, service: TranslateService) => {
    service.setDefaultLang('fr');
    expect(service.instant(translations.KEY.CCREG.WELCOME.TITLE)).toEqual("Commencez à utiliser les Services bancaires en ligne et mobiles");
  }));
  
});