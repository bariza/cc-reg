import { Validators } from "@angular/forms";

export const SelfRegValidators = {
  datePickerValidators: [Validators.required],
  postalCodeValidators: [
    Validators.required,
    Validators.pattern(/^(?!.*[DFIOQU])([A-VXY][0-9][A-Z]) ?([0-9][A-Z][0-9])$/)
  ],
  emailValidators: [
    Validators.required,
    Validators.email,
    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  ],
  phoneNumberValidators: [Validators.required]
};

export const SelfRegValidationErrors = {
  datePickerValidationErrors: [
    {
      flag: "required",
      message: "Please enter your date of birth."
    }
  ],
  postalCodeValidationErrors: [
    {
      flag: "required",
      message: "Please enter your postal code."
    },
    {
      flag: "min",
      message: "minimum 6 chars"
    },
    {
      flag: "max",
      message: "maximum 6 chars"
    },
    {
      flag: "pattern",
      message: "Invalid postal code"
    }
  ],
  homePhoneValidationErrors: [
    {
      flag: "required",
      message: "Please enter your home phone number."
    },
    {
      flag: "minlength",
      message: "minimum 10 digits"
    }
  ],
  businessPhoneValidationErrors: [
    {
      flag: "required",
      message: "Please enter your business phone number."
    },
    {
      flag: "minlength",
      message: "minimum 10 digits"
    }
  ],
  emailValidationErrors: [
    {
      flag: "required",
      message: "email required"
    },
    {
      flag: "email",
      message: "please provide a valid email"
    },
    {
      flag: "pattern",
      message: "please provide a valid email"
    }
  ]
};
