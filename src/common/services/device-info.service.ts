import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {fromEvent} from 'rxjs';

@Injectable()
export class DeviceInfoService {
  private _userAgent = window.navigator.userAgent;
  private _changeSubject = new BehaviorSubject<number>(window.innerWidth);

  /**
   * Device info service that can be injected into components to get the information of the devices that is using the
   * code currently. Available information include the device type, device os and device width
   * @param  {NgZone} zone An injectable service for executing work inside or outside of the Angular zone.
   */
  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular( () => {
     fromEvent(window, 'resize')
      // TODO do we need this set to 100ms? makes image transition quite sluggish while resizing
      .debounceTime(100)
      .distinctUntilChanged()
      .subscribe( (e: Event) => {
        this.zone.run( () => {
          this._changeSubject.next((e.target as Window).innerWidth);
        });
      });
    });
  }
  /**
  * Get the user agent string of the device
  * @returns {string} Device User Agent
   */
  getUserAgent(): string {
    return this._userAgent;
  }
  /**
   * Get the operating system of the device
   * @returns {string} type of operating system that the device uses whether it's iOS, Android, or Other
   */
  getOS(): string {
    try {
      if (/iPad|iPhone|iPod/.test(this._userAgent) && !(window as any).MSStream) {
        return 'iOS';
      } else if (/android/i.test(this._userAgent)) {
        return 'Android';
      } else {
        return 'Other';
      }
    } catch (e) {
      return null;
    }
  }
  /**
   * Get the type of the  device
   * @returns {string} type of device whether it's iPad, iPhone, Android, or other
   */
  getDeviceType(): string {
    try {
      if (/iPad/.test(this._userAgent) && !(window as any).MSStream) {
        return 'iPad';
      } else if (/iPhone/.test(this._userAgent) && !(window as any).MSStream) {
        return 'iPhone';
      } else if (/android/i.test(this._userAgent)) {
        return 'Android';
      } else {
        return 'Other';
      }
    } catch (e) {
      return null;
    }
  }

  /**
   * Determines whether the device is a mobile or not
   * @returns {boolean} true if it's a mobile, false otherwise
   */
  isMobile(): boolean {
    return this.getOS() === 'iOS' || this.getOS() === 'Android';
  }

  /**
   *  Returns an Observable to which interested parties can subscribe to get the window size after resizing
   * @returns {BehaviorSubject<Number>} Observable
   */
  getWidth(): Observable<number> {
    return this._changeSubject.asObservable();
  }
}
