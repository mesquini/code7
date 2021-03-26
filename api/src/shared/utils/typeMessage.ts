import { ErrorReport } from '@hapi/joi';
import AppError from '@shared/errors/AppError';

const typeMessage = (err: ErrorReport[], field: string) => {
  const { code } = err[0];

  switch (code) {
    case 'any.only':
      return field;
    case 'any.required':
      return `${field} é um campo obrigatório`;
    case 'string.email':
      return `${field} tem que ser um email`;
    // case 'string.max':
    //   return `${field} é permitido somente ${local.limit} caracteres`;
    // case 'string.min':
    //   return `${field} deve conter no mínimo ${local.limit} caracteres`;

    default:
      return `${field} é um campo obrigatório`;
  }
};

const message = (err: ErrorReport[], field: string) => {
  throw new AppError(typeMessage(err, field));
};

export default message;
