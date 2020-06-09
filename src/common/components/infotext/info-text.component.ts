import { Component, Input } from '@angular/core';

/**
 * Info text component
 * @export
 * @class InfoTextComponent
 */
@Component({
    selector: 'info-text',
    templateUrl: 'info-text.component.html',
    styleUrls: ['info-text.component.scss']
  })
  export class InfoTextComponent {

  /**
   * The button type
   * @type {string}
   * @memberOf InfoTextComponent
   */
   @Input() messageHeader: string ='';

  /**
   * Set button ID
   * @type {string}
   * @memberOf InfoTextComponent
   */
   @Input() messageBody: string ='';

}