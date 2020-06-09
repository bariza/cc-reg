import { Component, OnInit, HostListener, HostBinding, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as selfRegActions from '../../state-management/actions/self.register.actions';
import { environment } from '../../../../environments/environment';
import { routerTransition } from 'src/common/animations/router.animations';
import { TranslateService } from '@ngx-translate/core';
import {SelfRegisterState} from '../../models';
import { Key } from 'protractor';
import { TranslationsOB } from 'src/common/i18n/translationsob';

@Component({
  selector: 'app-wlecome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [routerTransition()],
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  externalLink = '';
  language: string;

  /**
   * Set Animation
   * @memberof RegistrationStep0Component
   */
  @HostBinding('@routerTransition') routerTransition = true;

  /**
   * Set window width
   * @memberof RegistrationStep0Component
   */
  width = window.innerWidth;

  /**
   * Track the scroll Event and send data to the $element
   * @param {any} event : window:resize
   * @memberOf RegisterStep0Component
   */

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth;
  }

  constructor(private _store: Store<SelfRegisterState>,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private translations: TranslationsOB
              ) {
  }

  ngOnInit() {
    this._store.dispatch(selfRegActions.resetState());
    this._store.subscribe(resp => {
      this.language = resp.languageButtonText;
      //this.redirectToEnglishOrFrench(environment.english_agreement_link,
        //environment.french_agreement_link, 'externalLink', false);
      if (resp.serviceAgreementRead) {
        this.router.navigate(['../account-details'], {relativeTo: this.route});
      }
    });
  }

  /**
   * handle accessibility requirement
   */
  ngAfterViewInit(): void {
    this.goToHeader();
  }
  /**
   * handle url redirects
   * @param {englishURL} englishURL:string
   * @param {frenchURL} frenchURL:string
   * @param {instanceProp} instanceProp:string
   * @param {redirect} redirect:boolean
   */
  redirectToEnglishOrFrench(englishURL: string, frenchURL: string, instanceProp: string, redirect: boolean) {
    if (this.language === 'Français') {
      redirect ? window.location.href = englishURL : this[instanceProp] = englishURL;
    } else {
      redirect ? window.location.href = frenchURL : this[instanceProp] = frenchURL;
    }
  }

  /**
   * handle next button
   */
  welcomeSubmitted() {
    this._store.dispatch(selfRegActions.welcomeSubmitted());
  }

  /**
   * handle cancel button
   */
  submitCancel() {
    //this._store.dispatch(selfRegActions.showDialog({false}));
    //this.redirectToEnglishOrFrench(environment.bmo_home_english, environment.bmo_home_french, null, true);
  }
  /**
   *  Function that focuses on header as the page loads
   */
  goToHeader() {
    if (document.getElementById('header')) {
      document.getElementById('header').focus();
    }
  }

  getTranslations():TranslationsOB{
    return this.translations;
  }

}
