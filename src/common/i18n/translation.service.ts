/**
 * Translation service, uses ngx to provide translation to the application
 * in order to generate or update the translation file for french, use the command npm run i18n-fr
 * in order to set a locale, either use the url parameter lang=fr, or set lang="fr" in local storage
 * in order to enable autocomplete, define the labels in hierarchy structure within '../assets/i18n/{lang}.ts'
 *
 * Notes: For generator to work properly translations should be done one of the following ways:
 * If use 'translations' keywords, must declare 'public translations: TranslationsOB' in the constructor of component
 *
 * Static:
 *  {{'KEY.SUBKEY1.SUBKEY2' | translate}} or {{translations.KEY.SUBKEY1.SUBKEY2} | translate}
 *
 * Dynamic:
 * {{ 'Test {var}' | translate: {var: 123} }} or {{ translations.KEY.Test {var} | translate: {var: 123} }}
 * <div translate="Welcome back, {userName}" [translateParams]="{userName: userName}"></div>
 * 
 * In TS:
 * 
 * With autocomplete:
 *  const test = this.translations.KEY.SUBKEY1.SUBKEY2;
 *  console.log(this.translate.instant(test));
 * 
 * OR
 *  console.log(this.translate.instant('KEY.SUBKEY1.SUBKEY2'));
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  TranslateModule, TranslateLoader, TranslateService,
  TranslateParser, TranslateDefaultParser, MissingTranslationHandler, MissingTranslationHandlerParams
} from '@ngx-translate/core';
import { LocalStorageService, Keys } from '../services/local-storage.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as eng from '../assets/i18n/en';
import * as fre from '../assets/i18n/fr';
import {TranslationsOB} from './translationsob';

const TRANSLATION_LANG_LIST = {
  en: eng,
  fr: fre
};

export class WebpackTranslateLoader implements TranslateLoader{
  getTranslation(lang: string): Observable<any> {
    return of(TRANSLATION_LANG_LIST[lang].default);
  }
}

export const TranslationAppConfig = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useClass: WebpackTranslateLoader,
  }
});

@Injectable()
export class TranslationService {
  /**
   * Observable to indicate if translation loading is complete
   *
   * @type {Observable<any>}
   * @memberof TranslationService
   */
  translationsLoaded: Observable<any>;

  readonly keys = Keys;

  /**
   * Creates an instance of TranslationService.
   * @param {TranslateService} translateService the ngx translation service
   * @param {LocalStorageService} localStorage localStorage Service that abstracts the window.localStorage
   * @memberof TranslationService
   */
  constructor(
    private translateService: TranslateService,
    private localStorage: LocalStorageService
  ) { }

  /**
   * Initialize the translation service
   */
  public initialize() {
    // There are two ways of setting up the translation, either the url parameter lang='fr'
    // or the local storage
    const searchParams = new URLSearchParams(location.search.replace('?', ''));

    this.translateService.setDefaultLang('en');
    if (searchParams.get('lang') === 'fr' || (searchParams.get('lang') !== 'en' && this.localStorage.get(this.keys.APP_LANGUAGE) === 'fr')) {
      this.translationsLoaded = this.translateService.use('fr').pipe(map(() => true));
    } else {
      this.translationsLoaded = this.translateService.use('en').pipe(map(() => true));
    }
  }
}

// Below this point is for custom parsing logic to allow us to use english text as keys
// while still supporting dynamic text. Replacement will be done on single braces.
// Eg. Welcome back, {user}
// Code used from https://github.com/ngx-translate/core/issues/340
export class InterpolatedTranslateParser extends TranslateDefaultParser {
  public templateMatcher: RegExp = /{\s?([^{}\s]*)\s?}/g;
}
export class InterpolatedMissingTranslationHandler implements MissingTranslationHandler {
  public parser: TranslateParser = translateParserFactory();
  public handle(params: MissingTranslationHandlerParams) {
    return params.translateService.parser.interpolate(params.key, params.interpolateParams);
  }
}

export function translateParserFactory() {
  return new InterpolatedTranslateParser();
}

export const TRANSLATE_PROVIDERS = [
  { provide: TranslateParser, useFactory: translateParserFactory },
  { provide: MissingTranslationHandler, useClass: InterpolatedMissingTranslationHandler },
  TranslationsOB
];
