export interface FormatExceptionMessageInterface {
  message: string;
  codeError?: number;
}

export interface ExceptionInterface {
  badRequestException(data: FormatExceptionMessageInterface): void;
  internalServerErrorException(data?: FormatExceptionMessageInterface): void;
  forbiddenException(data?: FormatExceptionMessageInterface): void;
  unauthorizedException(data?: FormatExceptionMessageInterface): void;
}
