import { mapper } from '../../app/errors/mapper/map';

/**
 * check password has six repeating chars
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

/**
 * get error details from error code
 * @param {code} code the error code
 * @returns {error} the error object
 */
export function getErrordetails(code) {
  return {
    title: mapper[code + '_TITLE'],
    message: mapper[code + '_MSG'],
    type: mapper[code + '_TYPE'],
    analyticsType: mapper[code + '_ANALYTICSTYPE'],
    footer: mapper[code + '_FOOTER']
  };
}

/**
 * @param {string} string the input string
 * @param {lookup} lookup the char to lookup
 * @param {position} position:number the position
 * @return {number} the index
 */
export function getIndex(string, lookup, position) {
  let length = string.length, i = -1;
  while (position-- && i++ < length) {
    i = string.indexOf(lookup, i);
    if (i < 0) {
      break;
    }
  }
  return i;
}

/**
 * handles closing the browser
 */
export function closeBrowser() {
  window.open('', '_self').close();
}
