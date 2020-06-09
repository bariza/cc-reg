import { NgModule } from '@angular/core';
import {ClickOutsideDirective} from './click-outside/click-outside.directive';
import {OnlyNumbersDirective} from './only-numbers/only-numbers.directive';

const directives = [
  ClickOutsideDirective,
  OnlyNumbersDirective
];

@NgModule({
  declarations: [
    directives
  ],
  exports: [
    directives
  ]
})
export class DirectivesModule {}
