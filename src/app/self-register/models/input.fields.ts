export interface InputFields {
  /**
   * type
   * @type {string}
   * @memberOf InputFields
   */
  type: string;

  /**
   * field
   * @type {string}
   * @memberOf InputFields
   */
  readonly fieldName: string;

  /**
   * value
   * @type {string}
   * @memberOf InputFields
   */
  value: string;

  /**
   * minlength
   * @type {number}
   * @memberOf InputFields
   */
  readonly minlength: number;

  /**
   * maxlength
   * @type {number}
   * @memberOf InputFields
   */
  readonly maxlength: number;

  /**
   * allowDashes
   * @type {boolean}
   * @memberOf InputFields
   */
  readonly allowDashes?: boolean;

  /**
   * input mask
   * @type {Array}
   * @memberOf InputFields
   */
  readonly mask?: Array<string | RegExp>;

  /**
   * input id
   * @type {string}
   * @memberOf InputFields
   */
  readonly id?: string;
}
