import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class EnumInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (
          error instanceof QueryFailedError &&
          error.message.includes('invalid input value for enum')
        ) {
          const match = error.message.match(/enum (\w+)_/)[1].split('_')[1];

          throw new HttpException(
            `Invalid value for ${match} `,
            HttpStatus.BAD_REQUEST,
          );
        }

        throw error;
      }),
    );
  }
}
