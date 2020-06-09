import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import {throwError} from 'rxjs';
import {Location} from '@angular/common';

import {getIndex} from '../../../common/helpers/helpers';

@Injectable()
export class SelfRegisterService {

  private handleError(error: Response | any) {
    const errorObj = {
      status: error.status,
      statusText: error.statusText
    };

    try {
      // TODO fix this when backend error resp is final
      // errorObj['description'] = error.json().body.errorList[0].description || '';
      errorObj['code'] =  error.error.code;
      // errorObj['fieldName'] = error.json().body.errorList[0].fieldName || '';
      // errorObj['hostUrl'] = error.json().integrationResHeader.hostUrl || '';
    } catch (e) {
    }

    if (error.status !== 404) {
      return throwError(errorObj);
    }
    return throwError({
      status: error.status,
      statusText: error.statusText
    });
  }

  // TODO set debug to false when CS is up
  private _call(http, method, url, retries, data, debug = true) {
    let dynamic_url = this.getBaseUrl(debug);

    function methodCall(verb) {
      switch (verb) {
        case 'get':
          return http.get(`${dynamic_url}/${url}`);
        case 'post':
          return http.post(`${dynamic_url}/${url}`, JSON.stringify(data));
        case 'put':
          return http.put(`${dynamic_url}/${url}`, JSON.stringify(data))
      }
    }

    function isBackendError(status) {
      return status === 400 || status === 401 || status === 409 || status === 403
    }

    return methodCall(method)
      .map(res => {
        return res;
      })
      .retryWhen(function(errors) {
        return errors.scan((errorCount, err) => {
          if (errorCount >= retries || isBackendError(err.status)) {
            throw err;
          }
          return errorCount + 1;
        }, 0).delay(2000);
      })
      .catch(this.handleError);

  }

  constructor(private http: HttpClient,
              private location: Location) {
  }

  submitAccountDetails(data) {
    return this._call(this.http, 'post', 'ccreg/card', 3, data);
  }

  submitIdentification(data) {
    return this._call(this.http, 'post', 'ccreg/customer', 0, data);
  }

  submitPassword(data) {
    return this._call(this.http, 'post', 'ccreg/password', 0, data);
  }

  submitConfirmation(data, debug) {
    return this._call(this.http, debug ? 'get' : 'post', debug ? 'post_confirmation_success' : 'confirmation', 0, data);
  }

  terminateSession() {
    return this._call(this.http, 'get', 'terminateSession', 0, null);
  }

  pingServer() {
    return this._call(this.http, 'get', 'ping', 0, null);
  }

  /**
   * get mock backend url
   * @param {boolean} debug
   */
  private getBaseUrl(debug: boolean) {
    if (debug) {
      return '/api';
    }

    const url = window.location.href;
    const index = getIndex(url, '/', 3);
    return `${url.substring(0, index)}/channels-ms-creditcardregistration/v1`;
  }

  public getCurrentStep(): string {
    return this.location.path();
  }
}
