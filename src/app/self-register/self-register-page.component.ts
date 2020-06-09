import { Component, OnInit } from '@angular/core';

/**
 * Self Register Page Component
 * @export
 * @class SelfRegisterPageComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-self-register',
  templateUrl: './self-register-page.component.html'
})
export class SelfRegisterPageComponent implements OnInit {

  /**
   * Init SelfRegisterPageComponent
   * @returns {void}
   * @memberOf SelfRegisterPageComponent
   */
  ngOnInit() {
  }

  /**
   * go to footer
   * @memberOf SelfRegisterPageComponent
   */
  goToFooter() {
    if (document.getElementById('footer_links')) {
      document.getElementById('footer_links').focus();
    }
  }
}
