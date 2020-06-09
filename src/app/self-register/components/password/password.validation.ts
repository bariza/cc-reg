/**
 * This file contains validation rules for digital and IVR passwords.
 * Digital password is used for digital banking, whereas IVR password is used for telephone banking.
 */

/**
 * Password requirement regex
 * @type {object}
 */
const validationRules = {
  ruleUpperCaseLetters: /[A-Z].*/,
  ruleLowerCaseLetters: /[a-z].*/,
  ruleUpperAndLowerCaseLetters: /(?=.*[a-z])(?=.*[A-Z])/,
  ruleNumbers: /[0-9].*/,
  ruleAllowedSpecialChars: /[!@#$%^&*~()+\-=\[\]{};':",.<>\/?]/,
  ruleIllegalChars: /[^A-Za-z0-9!@#$%^&*~()+\-=\[\]{};':",.<>\/?]/,
  ruleAlphaNumeric: /^[0-9a-zA-Z]+$/,   // this rule is used for IVR password validation
  ruleNoSpecialChars: /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/  // this rule is used for IVR password validation
};

/**
 * Function that validates whether the length of the input is within a specified range
 * @param {string} input the input that needs the length validated
 * @param {number} minLength the min length the input must have
 * @param {number} maxLength the max length the input can have
 * @return {boolean} boolean whether length within acceptable range
 */
export const validateLength = (input: string, minLength: number, maxLength: number): boolean => {
  return input.length <= maxLength && input.length >= minLength;
};

/**
 * Validates whether input string contains at least one uppercase English letter
 * @param {string} input the string to validate
 * @returns {boolean} true if at least one uppercase letter present in input; false otherwise
 */
export const validateUpperCaseRule = (input: string): boolean => {
  return validationRules.ruleUpperCaseLetters.test(input);
};

/**
 * Validates whether input string contains at least one lowercase English letter
 * @param {string} input the string to validate
 * @returns {boolean} true if at least one lowercase letter present in input; false otherwise
 */
export const validateLowerCaseRule = (input: string): boolean => {
  return validationRules.ruleLowerCaseLetters.test(input);
};

/**
 * Validates whether input string contains at least one uppercase and lovwercase English letter
 * @param {string} input the string to validate
 * @returns {boolean} true if at least one uppercase and lowercase letter present in input; false otherwise
 */
export const validateUpperAndLowerCaseRule = (input: string): boolean => {
  return validationRules.ruleUpperAndLowerCaseLetters.test(input);
};

/**
 * Validates whether input string contains at least one number
 * @param {string} input the string to validate
 * @returns {boolean} true if at least one number present in input; false otherwise
 */
export const validateNumbersRule = (input: string): boolean => {
  return validationRules.ruleNumbers.test(input);
};

/**
 * Validates whether input string contains at least one mandatory special character
 * @param {string} input the string to validate
 * @returns {boolean} true if at least one mandatory special character present in input; false otherwise
 */
export const validateMandatorySpecialCharsRule = (input: string): boolean => {
  return validationRules.ruleAllowedSpecialChars.test(input);
};


/**
 * Validates whether input string contains any illegal characters
 * @param {string} input the string to validate
 * @returns {boolean} true if input contains any illegal characters; false otherwise
 */
export const validateIllegalCharsRule = (input: string): boolean => {
  return input.length === 0 ? false : validationRules.ruleIllegalChars.test(input);
};

/**
 * Validates whether input string contains alphanumeric characters only.
 * This rule is only used for IVR password validation
 * @param {string} input the string to validate
 * @returns {boolean} true if input contains only alphanumeric chars; false otherwise
 */
export const validateAlphaNumeric = (input: string): boolean => {
  return input.length === 0 ? false : validationRules.ruleAlphaNumeric.test(input);
};

/**
 * Validates whether input string contains no special characters.
 * This rule is only used for IVR password validation
 * @param {string} input the string to validate
 * @returns {boolean} true if input contains no special characters; false otherwise
 */
export const validateNoSpecialChars = (input: string): boolean => {
  return !validationRules.ruleNoSpecialChars.test(input);
};

/**
 * check password has six repeating chars
 * this is used for IVR password validation
 * @param {password} password:string
 * @returns {boolean} boolean
 */
export function checkRepeating(password) {
  let lowerCasePass = password.toLowerCase();
  const charArray = lowerCasePass.split('');
  if (charArray.length > 0) {
    return charArray.reduce((a, b) => (a === b) ? a : false);
  }
}

/**
 * check password has a simple sequence
 * this is used for IVR password validation
 * @param {password} password:string
 * @returns {boolean} boolean
 */
export function checkSimpleSequence(password) {
  const simpleSequencesArray = [
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ];

  let lowerCasePass = password.toLowerCase();

  for (let i = 0; i < simpleSequencesArray.length; i++) {
    const regex = new RegExp('^[' + simpleSequencesArray[i] + ']+$');
    if (regex.test(lowerCasePass) || checkConsecutiveSequence(lowerCasePass)) {
      return false;
    }
  }
  return true;
}

/**
 * check password has six consecutive chars
 * this is used for IVR password validation
 * @param {password} lowerCasePass:string
 * @returns {boolean} boolean
 */
export function checkConsecutiveSequence(lowerCasePass) {
  const splitted = lowerCasePass.split('');
  let passwordValid = false;

  for (let z = 0; z < splitted.length; z++) {
    if (!isNaN(splitted[z])) {
      splitted[z] = +splitted[z];
    }
  }

  splitted.every(char => {
    passwordValid = typeof char === 'string' ? !checkConsecutiveLetters(lowerCasePass) : !checkConsecutiveDigits(splitted)
  });

  /**
   * Check whether the numbers are consecutive
   * @param {int[]} digits numbers that need to be checked if they are consecutive
   * @returns {boolean} true if numbers are consecutive false otherwise
   */
  function checkConsecutiveDigits(digits) {
    let count = 0;

    digits.forEach((i, idx) => {
      if (idx > 0) {
        if (i === (+digits[idx - 1] + 1)) {
          count++;
        } else if (i === (+digits[idx - 1] - 1)) {
          count++;
        } else {
          if (count < 5) {
            count = 0;
          }
        }
      }
    });
    return count < 5;
  }

  /**
   * check password for sequential alphabetical characters
   * @param {password} letters:string
   * @returns {boolean} boolean
   */
  function checkConsecutiveLetters(letters) {
    for (let i in letters) {
      if (String.fromCharCode(letters.charCodeAt(i) + 1) === letters[+i + 1]
        && String.fromCharCode(letters.charCodeAt(i) + 2) === letters[+i + 2]
        && String.fromCharCode(letters.charCodeAt(i) + 3) === letters[+i + 3]
        && String.fromCharCode(letters.charCodeAt(i) + 4) === letters[+i + 4]
        && String.fromCharCode(letters.charCodeAt(i) + 5) === letters[+i + 5]) {
        return false;
      }
    }
    return true;
  }
  return passwordValid;
}
