import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { ModelNotFound } from './ModelNotFound';

export function ExceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: CallableFunction,
) {
  let msg = `${err.message}\n\n${err.stack}`;
  if (process.env.APP_ENV === 'production') {
    msg = '';
  }

  if (res.headersSent) {
    return next(err);
  }

  switch (true) {
    case err instanceof ModelNotFound:
      res.status(404).end(msg);
      break;
    case err instanceof Error.ValidationError:
      res.status(422).end(msg);
      break;
    default:
      res.status(500).end(msg);
      break;
  }
}
