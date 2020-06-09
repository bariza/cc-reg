import { Injectable } from '@angular/core';
/**
 * Keys for local storage used within this app
 */
export const Keys = {
  APP_LANGUAGE: 'APP_LANGUAGE',
  APP_LANGUAGE_LABEL: 'APP_LANGUAGE_LABEL',
  // To remember what question was returned in account details screen
  SECURITY_QUESTION: 'SECURITY_QUESTION',
  BASE_URL: 'BASE_URL'
};

/**
 * Local storage manager
 * @export
 * @class LocalStorageService
 */
@Injectable()
export class LocalStorageService {
  /**
   *  Retrieve the value from the local storage
   * @param {string} key key to retrieve value
   * @returns {any} value from local storage
   */
  get (key: string): any {
    if (key !== null ) {
      try {
        let val = window.localStorage.getItem(key);
        if (val) {
          return JSON.parse(val);
        } else {
          return null;
        }
      } catch (e) {
        return null;
      }
    }
  }
  /**
   * Set value in local storage
   * @param {String} key key for the item that needs to be stored
   * @param {*} value the item that needs to be stored
   * @return {void}
   */
  set (key: string, value: any): void {
    if (key !== null && value !== null) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
      }
    }
  }

  /**
   *  Remove value from local storage
   * @param {string} key key of the item that needs to be removed
   * @returns {void}
   */
  remove (key: string): void {
    if (key !== null ) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
      }
    }
  }

  /**
   * Clears the local storage
   * @returns {void}
   */
  clear (): void {
    window.localStorage.clear();
  }

  /**
   * Called once within the app to initialize this service
   * @memberOf LocalStorageService
   */
  initialize() {

    let dictObject = {};

    Object.keys(Keys).map(key => {
      try {
        let value = localStorage.getItem(Keys[key]);
        if (value) {
          dictObject[Keys[key]] = value;
        }
      } catch (e) {
        // TODO remove log
        console.error('Could not initialize local storage service', e);
      }
    });
  }
}
