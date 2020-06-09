import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {routerTransition} from 'src/common/animations/router.animations';
import * as HELPERS from 'src/common/helpers/helpers';
import {DeviceInfoService} from 'src/common/services/device-info.service';
import {SelfRegisterState} from 'src/app/self-register/models';
import {TranslationsOB} from 'src/common/i18n/translationsob';
import {environment} from 'src/environments/environment';
import {LocalStorageService, Keys} from 'src/common/services/local-storage.service';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  animations: [routerTransition()],

})
export class ConfirmationComponent implements OnInit, AfterViewInit {
  appLanguage: string;
  externalLink = '';
  width: number;
  deviceOS;
  deviceType;
  isMobile;

  /**
   * Set Animation
   * @memberOf ConfirmationComponent
   */
  @HostBinding('@routerTransition') routerTransition = '';

  constructor(private _store: Store<SelfRegisterState>,
              private _deviceInfo: DeviceInfoService,
              private translations: TranslationsOB,
              private localStorage: LocalStorageService
  ) {
  }

  ngOnInit() {
    this._deviceInfo.getWidth().subscribe(width => this.width = width);
    this.deviceOS = this._deviceInfo.getOS();
    this.deviceType = this._deviceInfo.getDeviceType();
    this.isMobile = this._deviceInfo.isMobile();
    // this._store.subscribe(resp => {
       // link to mobile or desktop link based on device detection and language selection
    // });
    this.appLanguage = this.localStorage.get(Keys.APP_LANGUAGE);
    if (this.appLanguage === 'fr') {
      this.isMobile ? this.externalLink = environment.french_mobile_online_banking_link : this.externalLink = environment.signInLinkFr;
    } else {
      this.isMobile ? this.externalLink = environment.english_mobile_online_banking_link : this.externalLink = environment.signInLinkEn;
    }
  }

  /**
   * handles submission of OK button on confirmation page
   */
  submitConfirmation() {
    window.location.href = this.externalLink;
  }

  /**
   * handles closing the browser
   */
  closeBrowser() {
    HELPERS.closeBrowser();
  }

  /**
   * handle Accessibility Requirement
   * @returns void
   */
  ngAfterViewInit() {
    this.goToHeader();
  }

  /**
   *  Function that focuses on header as the page loads
   */
  goToHeader() {
    if (document.getElementById('header')) {
      document.getElementById('header').focus();
    }
  }

  getTranslations(): TranslationsOB {
    return this.translations;
  }


  private setDownloadLinks(app_language) {

    //  switch (app_language) {
    // case 'en':
    //   this.isMobile ?
    //       this.externalLink = environment.english_mobile_online_banking_link : this.externalLink = environment.english_online_banking_link;
    //     // link to english mobile app download based on Android or iPhone/iPad
    //   if (this.deviceOS === 'iOS' && this.deviceType === 'iPad') {
    //     this.downloadLink = environment.APPLE_ITUNES_EN_IPAD_DOWNLOAD_LINK;
    //   } else if (this.deviceOS === 'iOS' && this.deviceType === 'iPhone') {
    //     this.downloadLink = environment.APPLE_ITUNES_EN_IPHONE_DOWNLOAD_LINK;
    //   } else if (this.deviceOS === 'Android') {
    //     this.downloadLink = environment.GOOGLE_PLAY_EN_DOWNLOAD_LINK;
    //   }
    //   break;
    // case 'fr':
    //   this.isMobile ?
    //       this.externalLink = environment.french_mobile_online_banking_link : this.externalLink = environment.french_online_banking_link;
    //     // link to french mobile app download based on Android or iPhone/iPad
    //   if (this.deviceOS === 'iOS' && this.deviceType === 'iPad') {
    //     this.downloadLink = environment.APPLE_ITUNES_FR_IPAD_DOWNLOAD_LINK;
    //   } else if (this.deviceOS === 'iOS' && this.deviceType === 'iPhone') {
    //     this.downloadLink = environment.APPLE_ITUNES_FR_IPHONE_DOWNLOAD_LINK;
    //   } else if (this.deviceOS === 'Android') {
    //     this.downloadLink = environment.GOOGLE_PLAY_FR_DOWNLOAD_LINK;
    //   }
    //   break;
    // }
  }
}
