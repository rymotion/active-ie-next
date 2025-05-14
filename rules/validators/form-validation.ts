import { Rule } from '../types';

export const requiredField: Rule = {
  validate: (value: any) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },
  message: 'This field is required'
};

export const emailValidation: Rule = {
  validate: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message: 'Please enter a valid email address'
};

// Export all rules
export const formRules = {
  required: requiredField,
  email: emailValidation
};
