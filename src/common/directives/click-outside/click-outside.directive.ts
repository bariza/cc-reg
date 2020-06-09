import {Directive, ElementRef, Output, EventEmitter, HostListener, Input} from '@angular/core';

@Directive({
   selector: '[clickOutside]'
})
export class ClickOutsideDirective {
   constructor(private _elementRef: ElementRef) {
   }
   @Input() disableClickOutside: boolean;

   @Output()
   clickOutsideEvent = new EventEmitter();

    private wasInside = false;
    private firstClick = true;

    @HostListener('click')
    clickInside() {
     this.wasInside = true;
    }

    @HostListener('document:click')
    clickout() {
    if (!this.wasInside && !this.firstClick && !this.disableClickOutside) {
        this.clickOutsideEvent.emit(null);
    }
    this.firstClick = false;
    this.wasInside = false;
    }
}
