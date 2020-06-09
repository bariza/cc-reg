import {Component, Inject, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {AppState} from './reducers';
import {Keys, LocalStorageService} from '../common/services/local-storage.service';
import * as selfRegActions from './self-register/state-management/actions/self.register.actions';
import {
  getApplicationLanguage,
  getLanguageButtonText
} from './self-register/state-management/selectors/self-register.selectors';
import {Observable, from} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {map} from 'rxjs/operators/map';

/**
 * Main application component
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * show hide dialog
   * @type {boolean}
   * @memberOf AppComponent
   */
  showDialog = false;

  // TODO JSDoc
  localStorageBtnLanguage: string;

  localStorageAppLanguage: string;

  language$: Observable<string>;

  appLanguage$: Observable<string>;


  /**
   * the timer running in the app
   * @type {Timer}
   * @memberOf AppComponent
   */

  // timer = TIMER;

  /**
   * Creates an instance of AccountDetailsComponent.
   * @param {Store} _store the store
   * @param {Router} router the angular router
   * @param {LocalStorageService} localStorage
   * @param {TranslateService} translate Service
   * @returns {void}
   * @memberOf AppComponent
   */
  constructor(private _store: Store<AppState>,
              private router: Router,
              private localStorage: LocalStorageService,
              // private ErrorActions: ErrorActions,
              // private timeoutService: TimeoutDialogService,
              private translate: TranslateService,
              // private srv: SelfRegisterService,
              @Inject(DOCUMENT) private _document: any) {

    translate.onLangChange
      .subscribe(lang => this._document.documentElement.lang = lang);
  }

  /**
   * Init AppComponent
   * @returns {void}
   * @memberOf AppComponent
   */
  ngOnInit() {
    this.localStorageBtnLanguage = this.localStorage.get(Keys.APP_LANGUAGE_LABEL) || 'Français';
    this.localStorageAppLanguage = this.localStorage.get(Keys.APP_LANGUAGE) || 'en';
    this._store.dispatch(selfRegActions.setLanguage({
      btnLang: this.localStorageBtnLanguage,
      appLang: this.localStorageAppLanguage
    }));
    this.language$ = this._store.pipe(select(getLanguageButtonText));
    this.appLanguage$ = this._store.pipe(select(getApplicationLanguage));
    /**   const currentStep = this.srv.getCurrentStep();
     if (currentStep === '/step2' || currentStep === '/step3' || currentStep === '/step4') {
      this.timeoutService.startTimer();
    }
     this.timeoutService.showTimer()
     .distinctUntilChanged()
     .subscribe(showTimeoutDialog => {
        this.showDialog = showTimeoutDialog;
        if (showTimeoutDialog === true) {
          this.timeoutService.popupTimer(this.timer);
        }
      });

     this.timeoutService.getTimerValue()
     .subscribe(timerVal => {
        this.timer.value = timerVal;
        if (timerVal <= 0 && this.timeoutService.dialogOpen) {
          this.timeoutService.hideTimer();
          this._store.dispatch(this.ErrorActions.sendTimeoutError());
          this.router.navigate(['/error']);
        }
      }); **/
  }

}
