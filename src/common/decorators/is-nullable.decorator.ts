import { ValidateIf, ValidationOptions } from 'class-validator';

export function IsNullable(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_, value) => value !== null, validationOptions);
}
