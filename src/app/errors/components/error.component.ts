import { Component, OnInit, HostBinding, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
import { routerTransition } from '../../../common/animations/router.animations';
import { ErrorContainer } from '../models/api.errors';
import { AppState } from '../../reducers';
import { mapper } from '../mapper/map';
import { getErrordetails } from '../../../common/helpers/helpers';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import {getErrorState} from '../state-management/error.selectors';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: [routerTransition()],
  encapsulation: ViewEncapsulation.None,
})

export class ErrorComponent implements OnInit, AfterViewInit {

  /**
   * Set Animation
   * @memberof RegisterStep0Component
   */
  @HostBinding('@routerTransition') routerTransition = true;

  mapper: any;
  forgotPasswordLink = environment.forgotPasswordLink;
  alreadyRegistered = false;
  timeoutError = false;
  alreadyRegisteredContactLink = environment.alreadyRegisteredContactLink;
  bmo_link = environment.bmo_home_english;
  /* tslint:disable:max-line-length */
  errorContainer: ErrorContainer = {
    error: '',
    title: 'Something went wrong',
    message: 'We are not able to complete your request at this time. Please call <br><a href="tel:1-888-226-7831">1-888-226-7831</a><br> and we can help you get set up.',
    type: 'FULLSCREEN',
    analyticsType: 'generic'
  };

  constructor(private _store: Store<AppState>,
              private translate: TranslateService,
              private router: Router) {
    this.mapper = mapper;
  }

  ngOnInit() {
    if (this.translate.currentLang === 'fr') {
      this.alreadyRegisteredContactLink = environment.alreadyRegisteredContactLinkFrench;
      this.bmo_link = environment.bmo_home_french;
    }
    this._store.pipe(select(getErrorState))
      .map(errors => {
        const errorList = errors.errorList;
        // TODO: according channel service response change this attribute
        const errorType = getErrordetails(errorList.statusCode).type;
        if (errorType === 'FULLSCREEN') {
          this.errorContainer = {
            error : '',
            title: getErrordetails(errorList.statusCode).title,
            message: getErrordetails(errorList.statusCode).message,
            type: getErrordetails(errorList.statusCode).type,
            analyticsType: getErrordetails(errorList.statusCode).analyticsType
          };
          this.timeoutError = errorList.statusCode === '4008';
          this.alreadyRegistered = errorList.statusCode === '4009';
        }
      });
  }

  goToSignIn() {
    if (this.translate.currentLang === 'fr') {
      window.location.href = environment.signInLinkFr;
    } else {
      window.location.href = environment.signInLinkEn;
    }
  }
  /**
   * handle accessibility requirement
   */
  ngAfterViewInit(): void {
    this.goToHeader();
  }

  goToStep0() {
    this.router.navigate(['step0']);
  }
  /**
   *  Function that focuses on header as the page loads
   */
  goToHeader() {
    if (document.getElementById('header')) {
      document.getElementById('header').focus();
    }
  }
}
