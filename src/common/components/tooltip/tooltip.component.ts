import {
  Component,
  Input, ViewEncapsulation
} from '@angular/core';

/**
 * Text field component
 * @export
 * @class TextfieldComponent
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent {
  /**
   * Name of the field when used within a formgroup
   * @type {string}
   * @memberOf TextfieldComponent
   */
  @Input() tooltipTitle = '';

  /**
   * Name of the field when used within a formgroup
   * @type {string}
   * @memberOf TextfieldComponent
   */
  @Input() toolTipClass = '';

  /**
   * Name of the field when used within a formgroup
   * @type {string}
   * @memberOf TextfieldComponent
   */
  @Input() toolTipErrorClass = '';

  /**
   * Name of the field when used within a formgroup
   * @type {string}
   * @memberOf TextfieldComponent
   */
  @Input() showToolTip = '';
}
