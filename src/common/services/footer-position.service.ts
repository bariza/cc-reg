import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FooterPositionService {

  private style = new Subject<any>();

  constructor() {
  }

  public setPosition(position = 'fixed', z_index: number = -3) {
    position === 'fixed' ?
      this.style.next({position: position, zIndex: z_index}) :
      setTimeout(() => {
        this.style.next({position: position, zIndex: z_index})
      }, 1000)

  }

  public getPosition() {
    return this.style;
  }

  public createPositionObservable() {
    return this.style.asObservable();
  }
}
