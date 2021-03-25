import { ValidationError } from 'yup';

interface IValidationErrors {
  [key: string]: string;
}

export default function getValidationErrors(
  err: ValidationError,
): IValidationErrors {
  const validationErrors: IValidationErrors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path as string] = error.message;
  });

  return validationErrors;
}
