import { HttpInterceptorFn } from "@angular/common/http";

export const ApiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = '/api/';

  const apiReq = req.clone({
    url: `${baseUrl}${req.url}`
  });

  return next(apiReq);
};