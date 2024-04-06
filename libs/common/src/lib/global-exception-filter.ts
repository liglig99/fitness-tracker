import { Catch, HttpStatus } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllGlobalExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<unknown> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (this.isHttpError(exception.response)) {
      //TODO this can still contain an invalid status code.
      response.status(exception.status).json(exception.response);
    } else {
      console.error(exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    return throwError(() => exception);
  }
}
