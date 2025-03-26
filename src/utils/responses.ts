import type { Response } from 'express';

export function successResponse(response: Response, data: any, message: string = 'Success') {
    response.status(200).json({
        success: true,
        message,
        data,
    });
    return;
}

export function errorResponse(response: Response, status: number, error: string) {
    response.status(status).json({
        success: false,
        error,
    });
    return;
}
