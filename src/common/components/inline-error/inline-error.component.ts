import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inline-error',
  templateUrl: 'inline-error.component.html'
})
export class InlineErrorComponent {
  /**
   * ID of the inline error element
   * @type {string}
   * @memberOf InlineErrorComponent
   */
  @Input() errorId = '';

  /**
   * Alt text of the inline error icon
   * @type {string}
   * @memberOf InlineErrorComponent
   */
  @Input() imgAlt = '';

  /**
   * Source of the inline error icon image
   * @type {string}
   * @memberOf InlineErrorComponent
   */
  @Input() imgSrc = 'common/assets/images/exclamation-mark.svg';

  /**
   * Text of the inline error element
   * @type {string}
   * @memberOf InlineErrorComponent
   */
  @Input() errorMsg = '';
}


