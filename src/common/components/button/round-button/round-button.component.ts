import { Component, Input } from '@angular/core';

/**
 * Round button component
 * @export
 * @class RoundButtonComponent
 */
@Component({
  selector: 'app-round-button',
  templateUrl: 'round-button.component.html',
  styleUrls: ['round-button.component.scss']
})
export class RoundButtonComponent {
  /**
   * When set, make the button clear color
   * @type {boolean}
   * @memberOf RoundButtonComponent
   */
  @Input() clear = true;

  /**
   * Accessibility text of the button
   * @type {string}
   * @memberOf RoundButtonComponent
   */
  @Input() ariaLabel = '';

  /**
   * When set, make the button disabled
   * @type {boolean}
   * @memberOf RoundButtonComponent
   */
  @Input() disabled = true;

  /**
   * Show the button as transparent
   * @type {boolean}
   * @memberOf RoundButtonComponent
   */
  @Input() fullTransparent = false;

  /**
   * When the button is enabled
   * @type {boolean}
   * @memberOf RoundButtonComponent
   */
  @Input() enabled = true;

  /**
   * When the button is transparent
   * @type {boolean}
   * @memberOf RoundButtonComponent
   */
  @Input() transparent = false;

  /**
   * Whether to use high contrast, in this case the button is
   * currently white and the text is dark blue
   * @type {boolean}
   * @memberOf RoundButtonComponent
   */
  @Input() highContrast = false;

  /**
   * The button type
   * @type {string}
   * @memberOf RoundButtonComponent
   */
  @Input() type = '';

  /**
   * Uppercase the btn text
   * @type {string}
   * @memberOf RoundButtonComponent
   */
  @Input() uppercase = false;

  /**
   * Set button ID
   * @type {string}
   * @memberOf RoundButtonComponent
   */
  @Input() buttonId = '';

  // /**
  //  * Set/Unset button ripple effect
  //  * @type {boolean}
  //  * @memberOf RoundButtonComponent
  //  */
  // @Input() disableRipple = false;
}
