/**
 * Object for the error state
 * @export
 * @interface ErrorState
 */
export interface ErrorState {
  errorList: Error;
}

/**
 * Object for the errors
 * @export
 * @interface Error
 */
export interface Error {
  // TODO : need to change these attributes according channel service response
  type: ErrorType;
  level: ErrorLevel;
  message: string;
  statusCode: string;
}

/**
 * Object for the error type
 * @export
 * @enum {number}
 */
export enum ErrorType {
  OnScreen,
  Terminal
}

/**
 *
 * @export
 * @enum {number}
 */
export enum ErrorLevel {
  Server,
  Timeout
}
