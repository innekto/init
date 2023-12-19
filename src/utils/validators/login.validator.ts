import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsLogin', async: false })
export class IsLoginConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const isEmail = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      value,
    );
    const isPhoneNumber = /^\+\d{12}$/.test(value);

    return isEmail || isPhoneNumber;
  }

  defaultMessage(args: ValidationArguments) {
    const isPhoneNumber = /^\+\d{12}$/.test(args.value);

    return isPhoneNumber
      ? 'Invalid phone number format'
      : 'Invalid email format';
  }
}
