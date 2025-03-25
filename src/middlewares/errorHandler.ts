import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from 'utils/responses.ts';

export function errorHandler(err: any, request: Request, response: Response, next: NextFunction) {
    console.error(err);
    errorResponse(response, 500, err);
}
