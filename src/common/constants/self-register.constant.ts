export const SelfRegFieldLengths = {
  CardNumber: {
    min: 19,
    max: 19
  },
  CvcNumber: {
    min: 3,
    max: 3
  },
  NumberOfBankAccounts: {
    min: 1,
    max: 2
  },
  Email: {
    min: 6,
    max: 80
  },
  Password: {
    min: 8,
    max: 32
  },
  PhoneNumber:{
    min:14,
    max:14
  }
};

export interface AccountDetailsValues {
  creditCardNumber: string,
  cvcNumber: string,
  expiryDate: string
}

export const SecurityQuestionsFields = {
  showHideInputText: {
    q1_answer: 'SHOW',
    q2_answer: 'SHOW',
    q3_answer: 'SHOW'
  },
  isPassword: {
    q1_answer: true,
    q2_answer: true,
    q3_answer: true
  },
  answers_regex: '^[ A-Za-zÀ-ÿ0-9]*$',
  answers_inline_error_text: 'Your answer must have between 2 and 50 characters and can only contain letters, numbers. Special characters are not allowed',
  RSA: {
    q1: {
      selectedValue: '',
      answer: '',
      placeholder: 'Your answer',
      label: 'First RSA answer',
      name: 'q1_answer',
      minLength: 2
    },
    q2: {
      selectedValue: '',
      answer: '',
      placeholder: 'Your answer',
      label: 'Second RSA answer',
      name: 'q2_answer',
      minLength: 2
    },
    q3: {
      selectedValue: '',
      answer: '',
      placeholder: 'Your answer',
      label: 'Third RSA answer',
      name: 'q3_answer',
      minLength: 2
    },
    questions: {
      set1: [
        {
          value: '26',
          displayValue: 'What city were you born in?'
        },
        {
          value: '33',
          displayValue: 'What is your father\'s middle name?'
        },
        {
          value: '50',
          displayValue: 'What is your youngest child\'s middle name?'
        },
        {
          value: '38',
          displayValue: 'What is your spouse\'s/partner\'s middle name?'
        },
        {
          value: '29',
          displayValue: 'What is the middle name of your oldest sibling?'
        },
        {
          value: '32',
          displayValue: 'What is the first name of your oldest niece?'
        },
        {
          value: '43',
          displayValue: 'What is the first name of your mother\'s oldest sibling?'
        },
        {
          value: '36',
          displayValue: 'What was the first name of your first roommate?'
        },
        {
          value: '47',
          displayValue: 'Who was your favourite athlete as a child?'
        },
        {
          value: '24',
          displayValue: 'What was the last name of your favourite teacher in high school?'
        }
      ],
      set2: [
        {
          value: '28',
          displayValue: 'What colour was your first car?'
        },
        {
          value: '49',
          displayValue: 'What is your mother\'s middle name?'
        },
        {
          value: '52',
          displayValue: 'What is the street name where you lived when you were 10 years old?'
        },
        {
          value: '45',
          displayValue: 'What is your favourite musical instrument?'
        },
        {
          value: '31',
          displayValue: 'What is the first name of your spouse\'s/partner\'s father?'
        },
        {
          value: '37',
          displayValue: 'What is the first name of the best man at your wedding?'
        },
        {
          value: '34',
          displayValue: 'What is the first name of the maid of honour at your wedding?'
        },
        {
          value: '30',
          displayValue: 'What is the first name of your father\'s oldest sibling?'
        },
        {
          value: '48',
          displayValue: 'What was the name of your favourite superhero as a child?'
        },
        {
          value: '42',
          displayValue: 'What was the last name of your favourite teacher in elementary school?'
        }
      ],
      set3: [
        {
          value: '27',
          displayValue: 'What was the name of your first pet?'
        },
        {
          value: '41',
          displayValue: 'What is the name of the city where your mother was born?'
        },
        {
          value: '39',
          displayValue: 'What is the name of the city where your father was born?'
        },
        {
          value: '25',
          displayValue: 'What is the first name of your first friend?'
        },
        {
          value: '40',
          displayValue: 'What is the first name of your oldest nephew?'
        },
        {
          value: '46',
          displayValue: 'What is your favourite cartoon?'
        },
        {
          value: '44',
          displayValue: 'What is the first name of your oldest cousin?'
        },
        {
          value: '51',
          displayValue: 'What is the first name of the person you went to your prom with?'
        },
        {
          value: '35',
          displayValue: 'What was the first name of your first manager?'
        }
      ]
    }
  }
};

export const InputTypes = {
  TEXT: 'text',
  PASSWORD: 'password',
  TEL: 'tel',
  EMAIL: 'email'
};
