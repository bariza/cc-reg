import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as  selfRegActions from 'src/app/self-register/state-management/actions/self.register.actions';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';
import {Keys, LocalStorageService} from 'src/common/services/local-storage.service';
import {AppState} from 'src/app/reducers';
import { TranslationsOB } from 'src/common/i18n/translationsob';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, OnChanges {

  public LOGO = require('../../assets/images/bmo-logo-blue.png');
  localStorageBtnLanguage: string;
  localStorageAppLanguage: string;
  showLanguage: boolean;
  routerSubscription: Subscription;
  routeSubscription: Subscription;
  BMOLink = 'https://www.bmo.com/main/personal';

  @Input() language: string;

  /**
   * @type {string} currentLang Current Language that is set in the app
   */
  @Input() currentLang: string;

  constructor(private _store: Store<AppState>,
              private translate: TranslateService,
              private translations: TranslationsOB,
              private el: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((val) => {
      this.el.nativeElement.scrollIntoView();
      if (val instanceof NavigationEnd) {
        this.showLanguage =  (val.url.substr(0, 8) === '/welcome' || val.urlAfterRedirects.substr(0, 8) === '/welcome');
      }
    });

    this.routeSubscription = this.route.queryParams.subscribe(queryParams => {
      if (queryParams && queryParams.lang && (queryParams.lang === 'fr' || queryParams.lang === 'en')) {
        if (queryParams.lang === 'fr') {
          this.setLanguage('Français');
        } else {
          this.setLanguage('English');
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changedLanguage = changes.language;
    if (changedLanguage && !changedLanguage.firstChange) {
      if (changedLanguage.currentValue === 'English') {
        this.BMOLink = 'https://www.bmo.com/principal/particuliers';
      } else if (changedLanguage.currentValue === 'Français') {
        this.BMOLink = 'https://www.bmo.com/main/personal';
      }
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  setLanguage(lang) {
    if (lang === 'Français') {
      this.localStorage.set(Keys.APP_LANGUAGE, 'fr');
      this.localStorage.set(Keys.APP_LANGUAGE_LABEL, 'English');
      this._store.dispatch(selfRegActions.setLanguage({btnLang:'English', appLang:'fr'}));
      this.translate.use('fr');
    } else {
      this.localStorage.remove(Keys.APP_LANGUAGE);
      this.localStorage.set(Keys.APP_LANGUAGE_LABEL, 'Français');
      this._store.dispatch(selfRegActions.setLanguage({btnLang:'Français', appLang:'en'}));
      this.translate.use('en');
    }
  }
  goToContent() {
    if (document.getElementById('title')) {
      document.getElementById('title').focus();
    }
  }
}
