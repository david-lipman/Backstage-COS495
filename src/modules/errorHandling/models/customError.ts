// Codes for errors in our application.
export enum CustomErrorCode {
  InvalidEmail,
  InvalidContractAddress,
  InvalidTokenId,
  InvalidDate,
  InvalidPermissions,
  PastDate,
  DuplicateEmail,
  DuplicateUsername,
  DuplicateTokenId,
  DuplicateWallet,
  ResourceNotFound,
}

export class CustomError extends Error {
  code: CustomErrorCode;
  httpCode: number;

  constructor(c: CustomErrorCode, param?: string) {
    let message: string;
    let httpCodeTemp: number;
    // Handle custom message.
    switch (c) {
      case CustomErrorCode.InvalidEmail: {
        message = `Email address ${param} is invalid`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.InvalidContractAddress: {
        message = `Contract address ${param} is invalid`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.InvalidTokenId: {
        message = `Token id ${param} is invalid`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.InvalidDate: {
        message = `Date ${param} is invalid`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.InvalidPermissions: {
        message = `Invalid permissions for user type ${param}`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.PastDate: {
        message = `Launch date ${param} can't be in the past`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.DuplicateEmail: {
        message = `Email address ${param} is already in the database`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.DuplicateUsername: {
        message = `Username ${param} is already in the database`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.DuplicateTokenId: {
        message = `TokenId ${param} is already in the database`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.DuplicateWallet: {
        message = `Wallet ${param} is already in the database`;
        httpCodeTemp = 400;
        break;
      }
      case CustomErrorCode.ResourceNotFound: {
        message = `Resource ${param} not found`;
        httpCodeTemp = 404;
        break;
      }
      default:
        message = "Internal Server Error";
        httpCodeTemp = 500;
    }
    super(message);
    this.code = c;
    this.httpCode = httpCodeTemp;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
