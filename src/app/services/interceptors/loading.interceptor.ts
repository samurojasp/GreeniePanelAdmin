import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { SpinnerService } from '../spinner/spinner.service';

export const LoadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  
  const spinnerService = inject(SpinnerService);
  spinnerService.show();
  
  return next(req).pipe(
    finalize(() => spinnerService.hide())
  );
};
