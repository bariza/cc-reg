import {
  checkRepeating,
  checkSimpleSequence,
  validateAlphaNumeric,
  validateIllegalCharsRule,
  validateLength,
  validateLowerCaseRule,
  validateMandatorySpecialCharsRule,
  validateNoSpecialChars,
  validateNumbersRule,
  validateUpperCaseRule,
} from './password.validation';

describe('PasswordValidations', () => {
  describe('DigitalPasswordValidations', () => {
    const min = 8;
    const max = 32;

    describe('validateLength', () => {
      it('should return error if length is below specified range', () => {
        let input = 'hello';
        expect(validateLength(input, min, max)).toBeFalsy();
      });
      it('should return error if length is below specified range', () => {
        let input = '';
        expect(validateLength(input, min, max)).toBeFalsy();
      });
      it('should return error if length is below specified range', () => {
        let input = 'æ^ÄGk4ù';
        expect(validateLength(input, min, max)).toBeFalsy();
      });
      it('should return error if length is below specified range', () => {
        let input = 'k';
        expect(validateLength(input, min, max)).toBeFalsy();
      });
      it('should return error if length is above specified range', () => {
        let input = '123456789012345678901234567890123';
        expect(validateLength(input, min, max)).toBeFalsy();
      });
      it('should return error if length is above specified range', () => {
        let input = 'Ûr2K&àBtbù[IÊ@?!WqHjbö!sZ#KË08Ge(Œ<u(J(ÔZLs-ÜRsePW';
        expect(validateLength(input, min, max)).toBeFalsy();
      });

      it('should pass if length is within range', () => {
        let input = '12345678901234567890123456789012';
        expect(validateLength(input, min, max)).toBeTruthy();
      });
      it('should pass if length is within range', () => {
        let input = '4aDÿÔ:ei';
        expect(validateLength(input, min, max)).toBeTruthy();
      });
      it('should pass if length is within range', () => {
        let input = '[êoNzPfœ;Ù{j1LÏÉ7G<œ{9RôfùÖÄtSœv';
        expect(validateLength(input, min, max)).toBeTruthy();
      });
      it('should pass if length is within range', () => {
        let input = '*èÉAE$Ÿf4é8À{WÎ';
        expect(validateLength(input, min, max)).toBeTruthy();
      });
    });

    describe('validateUpperCaseRule', () => {
      it('should return error if does not contain any uppercase letters', () => {
        let input = 'helloworld!123';
        expect(validateUpperCaseRule(input)).toBeFalsy();
      });
      it('should return error if does not contain any uppercase letters', () => {
        let input = '3/18Ÿ2r7k1';
        expect(validateUpperCaseRule(input)).toBeFalsy();
      });
      it('should return error if does not contain any uppercase letters', () => {
        let input = 'ïû&üd0b7)ö';
        expect(validateUpperCaseRule(input)).toBeFalsy();
      });

      it('should pass if contains at least one uppercase letter', () => {
        let input = 'helloWorld!123';
        expect(validateUpperCaseRule(input)).toBeTruthy();
      });

    });

    describe('validateLowerCaseRule', () => {
      it ('should return error if does not contain any lowercase letters', () => {
        let input = 'HELLOWORLD!123';
        expect(validateLowerCaseRule(input)).toBeFalsy();
      });
      it ('should return error if does not contain any lowercase letters', () => {
        let input = 'ÖR7.=Ë2ŒÀM';
        expect(validateLowerCaseRule(input)).toBeFalsy();
      });

      it ('should pass if contains at least one lowercase letter', () => {
        let input = 'hRÙ~I~À>@ür2i+â';
        expect(validateLowerCaseRule(input)).toBeTruthy();
      });
    });

    describe('validateNumbersRule', () => {
      it ('should return error if does not contain any numbers', () => {
        let input = 'HELLOworlD!';
        expect(validateNumbersRule(input)).toBeFalsy();
      });
      it ('should return error if does not contain any numbers', () => {
        let input = 'g;g)œräXÆÄ';
        expect(validateNumbersRule(input)).toBeFalsy();
      });

      it ('should pass if contains at least one number', () => {
        let input = 'çEÀZ7ÂzmQ{=ïÜÉUÊ4â/,géyrq';
        expect(validateNumbersRule(input)).toBeTruthy();
      });
    });

    describe('validateMandatorySpecialCharsRule', () => {
      it ('should return error if does not contain any special characters', () => {
        let input = 'HELLOworlD12';
        expect(validateMandatorySpecialCharsRule(input)).toBeFalsy();
      });
      it ('should return error if does not contain any special characters', () => {
        let input = 'àiDlGZ2bæf';
        expect(validateMandatorySpecialCharsRule(input)).toBeFalsy();
      });

      it ('should pass if contains at least one special character', () => {
        let input = 'Àï{>;ù6Ë';
        expect(validateMandatorySpecialCharsRule(input)).toBeTruthy();
      });
    });

    describe('validateIllegalCharsRule', () => {
      it ('should return error if contains illegal characters', () => {
        let input = '`HELLOworlD!12`';
        expect(validateIllegalCharsRule(input)).toBeTruthy();
      });
      it ('should return error if contains illegal characters', () => {
        let input = 'aö6|>HùxQ';
        expect(validateIllegalCharsRule(input)).toBeTruthy();
      });
      it ('should return error if contains illegal characters', () => {
        let input = '培训逻辑测试中文';
        expect(validateIllegalCharsRule(input)).toBeTruthy();
      });
      it ('should return error if contains illegal characters', () => {
        let input = 'ÀàÂâÆæÄäÇçÉéÈèÊêËëÎîÏïÔôŒœÖöÙùÛûÜüŸÿ';
        expect(validateIllegalCharsRule(input)).toBeTruthy();
      });

      it ('should pass if does not contains any illegal characters', () => {
        let input = '^3=15';
        expect(validateIllegalCharsRule(input)).toBeFalsy();
      });
      it ('should pass if does not contains any illegal characters', () => {
        let input = '%1q+20r=[39/*?WwoTfJeaC@(A1()8JU';
        expect(validateIllegalCharsRule(input)).toBeFalsy();
      });
    });
  });

  describe( 'validateAlphaNumberic', () => {
    it ('should return error if contains illegal characters', () => {
      let input = '`HELLOworlD!12`';
      expect(validateAlphaNumeric(input)).toBeFalsy();
    });
    it ('should return error if empty', () => {
      let input = '';
      expect(validateAlphaNumeric(input)).toBeFalsy();
    });
    it ('should return true if the password is valid', () => {
      let input = 'Hello124';
      expect(validateAlphaNumeric(input)).toBeTruthy();
    });
  });

  describe( 'validateNoSpecialChars', () => {
    it ('should return true if no special characters', () => {
      let input = 'HELLOworlD12';
      expect(validateNoSpecialChars(input)).toBeTruthy();
    });
    it ('should return false if there are special characters', () => {
      let input = 'HELLOworlD!!12';
      expect(validateNoSpecialChars(input)).toBeFalsy();
    });
  });

  describe( 'checkRepeating', () => {
    it ('should return true if password contains repeating characters', () => {
      let input = 'aaaaaa';
      expect(checkRepeating(input)).toBeTruthy();
    });
  });

  describe( 'checkSimpleSequence', () => {
    it ('should return true if password does not contain simple sequence', () => {
      let input = 'HelloWorld123';
      expect(checkSimpleSequence(input)).toBeTruthy();
    });
    it ('should return true if password does not contain simple sequence', () => {
      let input = 'HelloWorld';
      expect(checkSimpleSequence(input)).toBeTruthy();
    });
    it ('should return false if password contains simple sequence', () => {
      let input = 'abcabc';
      expect(checkSimpleSequence(input)).toBeFalsy();
    });
    it ('should return false if password contains simple sequence', () => {
      let input = '123456';
      expect(checkSimpleSequence(input)).toBeFalsy();
    });
    it ('should return false if password contains simple sequence', () => {
      let input = '654321';
      expect(checkSimpleSequence(input)).toBeFalsy();
    });
    it ('should return true if password is less than 6 characters and simple sequence', () => {
      let input = '1234';
      expect(checkSimpleSequence(input)).toBeTruthy();
    });
  });
});
