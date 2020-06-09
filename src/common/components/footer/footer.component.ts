import {Component, OnInit} from '@angular/core';
import {FooterPositionService} from '../../services/footer-position.service';
import {TranslationsOB} from 'src/common/i18n/translationsob';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  /**
   * the position style attribute
   * @memberOf FooterComponent
   */
  position: string;

  /**
   * the z index style attribute
   * @memberOf FooterComponent
   */
  zIndex: number;

  /**
   * @param {FooterPositionService} footerService the footer service
   * @param {TranslationsOB} translations the translation service
   * @memberOf FooterComponent
   */
  constructor(private footerService: FooterPositionService,
              private translations: TranslationsOB) {
  }

  /**
   * on init hook
   * @memberOf FooterComponent
   */
  ngOnInit() {
    this.footerService.setPosition('fixed', -3);
    this.footerService.createPositionObservable().subscribe(style => {
      this.position = style.position;
      this.zIndex = style.zIndex;
    })
  }

  /**
   * getter for translations
   * @returns {TranslationsOB} translations object class
   * @memberOf FooterComponent
   */
  getTranslations(): TranslationsOB {
    return this.translations;
  }

}
