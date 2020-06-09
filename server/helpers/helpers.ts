import * as moment from 'moment';
import { NextFunction, Request, Response } from 'express';

const REQUESTID = 'requestid';
const LANGUAGE = 'language';
const questionsList = ['BUSINESS_PHONE', 'HOME_PHONE', 'POSTAL_CODE', 'EMAIL'];
const businessCardList = [true, false];

export function verifyHeaders(req: Request, res: Response, next: NextFunction) {
  const keys = Object.keys(req.headers);
  if (keys && keys.includes(REQUESTID) && keys.includes(LANGUAGE)) {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
}

function verifyPhone(phone: string) {
  const reg = new RegExp('^([0-9]{3})-?([0-9]{3})-?([0-9]{4})$');
  return phone && reg.test(phone);
}

function verifyPostalCode(postalCode: string) {
  const reg = new RegExp(
    '^(?!.*[DFIOQU])([A-VXY][0-9][A-Z]) ?([0-9][A-Z][0-9])$'
  );
  return postalCode && reg.test(postalCode);
}
function verifyDateOfBirth(dob: string) {
  return !dob.includes('1999');
}

function verifyCardNumber(cardNumber: string) {
  const reg = new RegExp('^[\\d]+$');
  return (
    cardNumber &&
    cardNumber.length === 16 &&
    cardNumber.substr(0, 2) === '55' &&
    reg.test(cardNumber)
  );
}

function verifyCVC(cvc: string) {
  const reg = new RegExp('^\\d\\d\\d$');
  return cvc && cvc.length === 3 && reg.test(cvc);
}

function verifyExpiryDate(date: string) {
  return moment(date).isAfter(moment());
}

export function verifyCardInfo(
  cardNumber: string,
  cvc: string,
  expiryDate: string
) {
  let verification = {
    result: false,
    reason: '',
    code: 'GLB/001'
  };

  if (!verifyCardNumber(cardNumber)) {
    verification.reason = 'Please check you card number and try again';
    verification.code = '4002';
    return verification;
  } else if (!verifyCVC(cvc)) {
    verification.reason = 'Please check your CVC and try again';
    verification.code = '4002';
    return verification;
  } else if (!verifyExpiryDate(expiryDate)) {
    verification.reason = 'Please check you expiry date and try again';
    verification.code = '4002';
    return verification;
  }

  verification.result = true;
  return verification;
}

export function getCardResponse() {
  const randomQuestion =
    questionsList[Math.floor(Math.random() * questionsList.length)];
  const randomBusinessCard =
    questionsList[Math.floor(Math.random() * businessCardList.length)];
  return {
    challenges: ['DOB', randomQuestion],
    challengeToken: 'r23eTFGFtdfg54gHH5ng6yhgsShU',
    businessCard: randomBusinessCard
  };
}

export function verifyCustomerInfo(
  businessPhone = '',
  dob = '',
  homePhone = '',
  postalCode = '',
  email = ''
) {
  let verification = {
    result: false,
    reason: '',
    code: 'GLB/001'
  };
  if (dob && !verifyDateOfBirth(dob)) {
    verification.reason = 'Please check your date of birth and try again';
    verification.code = '4002';
    return verification;
  }
  if (postalCode && !verifyPostalCode(postalCode)) {
    verification.reason = 'Please check your postal code and try again';
    verification.code = '4002';
    return verification;
  }

  if (businessPhone && !verifyPhone(businessPhone)) {
    verification.reason =
      'Please check you business phone number and try again';
    verification.code = '4002';
    return verification;
  }
  if (homePhone && !verifyPhone(homePhone)) {
    verification.reason = 'Please check you home phone number and try again';
    verification.code = '4002';
    return verification;
  } else if (postalCode && !verifyPostalCode(postalCode)) {
    verification.reason = 'Please check your postal code and try again';
    verification.code = '4002';
    return verification;
  }

  verification.result = true;
  return verification;
}

export function verifyPassword() {
  let verification = {
    result: false,
    reason: ''
  };
  // TODO: Add logic
  verification.result = true;
  return  verification;
}
