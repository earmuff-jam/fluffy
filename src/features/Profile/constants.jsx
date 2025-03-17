
export const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
};

export const TEXTAREA_FORM_FIELDS = {
  multiline: true,
  minRows: 4,
  variant: 'outlined',
};

/**
 * Blank profile details to update user information
 */
export const BLANK_PROFILE_DETAILS = {
  username: {
    id: 'username',
    value: '',
    errorMsg: '',
    required: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 3,
        message: 'Username is required and must be more than three characters',
      },
    ],
  },
  firstName: {
    id: 'firstName',
    value: '',
    errorMsg: '',
    required: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'First Name is required',
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: 'First name should be less than 150 characters',
      },
    ],
  },
  lastName: {
    id: 'lastName',
    value: '',
    errorMsg: '',
    required: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'Last Name is required',
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: 'Last name should be less than 150 characters',
      },
    ],
  },
  emailAddress: {
    id: 'emailAddress',
    value: '',
    errorMsg: '',
    required: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'Email address is required',
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: 'Email address should be less than 150 characters',
      },
    ],
  },
  phoneNumber: {
    id: 'phoneNumber',
    value: '',
    errorMsg: '',
    required: false,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'Phone Number is required',
      },
      {
        validate: (value) => value.trim().length >= 15,
        message: 'Phone Number should be less than 15 characters',
      },
    ],
  },
  aboutMe: {
    id: 'aboutMe',
    value: '',
    errorMsg: '',
    required: false,
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Bio should be less than 500 characters',
      },
    ],
  },
};
