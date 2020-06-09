import { Directive, ElementRef, HostListener, Input } from '@angular/core';


/**
 * Directive that restricts input (including paste/drop) to numbers
 *
 * @export
 * @class OnlyNumbersDirective
 */
@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {

  /**
   * Flag to activate directive for number inputs
   *
   * @memberof OnlyNumbersDirective
   */
  @Input() allowNumbers = false;

  /**
   * Creates an instance of OnlyNumbersDirective.
   * @param {ElementRef} elementRef element ref
   * @memberof OnlyNumbersDirective
   */
  constructor(
    private elementRef: ElementRef
  ) { }

  /**
   * Only allow number and modifier keys
   *
   * @param {KeyboardEvent} e key event
   * @returns
   * @memberof OnlyNumbersDirective
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // disable for inputs that allow all characters
    if (!this.allowNumbers) {
      return;
    }

    // allow backspace and numbers
    if (e.keyCode === 8 || !isNaN(Number(e.key))) {
      return;  // let it happen, don't do anything
    }

    // else suppress the event
    e.preventDefault();
  }

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    // disable for inputs that allow all characters
    if (!this.allowNumbers) {
      return;
    }

    e.preventDefault();

    this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/\D/g, '');

  }
}
