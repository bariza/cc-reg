import { Injectable } from '@angular/core';

/**
 * RsaDevicePrintService is a wrapper for RSA proprietary Javascript
 * @export
 * @class RsaDevicePrintService
 */
@Injectable()
export class RsaDevicePrintService {
  /**
   *  Get device print from the RSA Javascript
   * @returns {string} RSA Device print value
   */
  getDevicePrint() {
    return window['add_deviceprint'] ? encodeURI(window['add_deviceprint']()) : null;
  }
}
