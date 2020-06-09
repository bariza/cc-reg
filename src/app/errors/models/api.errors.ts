/**
 * Model Interface for the API Response
 * @export
 * @interface ApiResponse
 */
export interface ApiErrors {
  /**
   * Backend API code
   * @type {string}
   * @memberOf ApiResponse
   */
  code?: string;

  /**
   * description
   * @type {string}
   * @memberOf ApiResponse
   */
  description?: string;

  /**
   * HTTP statusText
   * @type {string}
   * @memberOf ApiResponse
   */
  statusText: string;

  /**
   * fieldName
   * @type {string}
   * @memberOf ApiResponse
   */
  fieldName?: string;

  /**
   * HTTP status code
   * @type {string}
   * @memberOf ApiResponse
   */
  status: string;

  /**
   * HTTP onpage text
   * @type {string}
   * @memberOf ApiResponse
   */
  displayText?: string;
}

/**
 * Model Interface for the API Error mapper
 * @export
 * @interface ErrorMapper
 */
export interface ErrorMapper {
  title: string;
  message: string;
  type: string;
  analyticsType: string;
}

/**
 * Model Interface for the API Error
 * @export
 * @interface Error
 */
export interface Error {
  error: string;
}

/**
 * Model Interface for the API Error container
 * @export
 * @interface ErrorContainer
 */
export type ErrorContainer = Error & ErrorMapper;
