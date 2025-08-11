import { HttpInterceptorFn } from "@angular/common/http";

export const ApiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:3004/api/';

  const apiReq = req.clone({
    url: `${baseUrl}${req.url}`
  });

  return next(apiReq);
};