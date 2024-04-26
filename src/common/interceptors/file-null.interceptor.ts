import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class FileNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;

    if (!file) {
      request.file = null;
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
