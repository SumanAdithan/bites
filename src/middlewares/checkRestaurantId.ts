import type { Request, Response, NextFunction } from 'express';
import { initializeRedisClient } from 'utils/client.ts';
import { restaurantKeyById } from 'utils/keys.ts';
import { errorResponse } from 'utils/responses.ts';

export const checkRestaurantExists = async (request: Request, response: Response, next: NextFunction) => {
    const { restaurantId } = request.params;
    if (!restaurantId) {
        return errorResponse(response, 400, 'Restaurant ID not fount');
    }

    const client = await initializeRedisClient();
    const restaurantKey = restaurantKeyById(restaurantId);
    const exists = await client.exists(restaurantKey);
    if (!exists) {
        return errorResponse(response, 404, 'Restaurant Not Found');
    }
    next();
};
