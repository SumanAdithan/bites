import express, { type Request } from 'express';
import { checkRestaurantExists } from 'middlewares/checkRestaurantId.ts';
import { validate } from 'middlewares/validate.ts';
import { nanoid } from 'nanoid';
import { Restaurant, RestaurantSchema } from 'schemas/restaurant.ts';
import { initializeRedisClient } from 'utils/client.ts';
import { restaurantKeyById } from 'utils/keys.ts';
import { successResponse } from 'utils/responses.ts';
const router = express.Router();

router.post('/', validate(RestaurantSchema), async (request, response, next) => {
    const data = request.body as Restaurant;
    try {
        const client = await initializeRedisClient();
        const id = nanoid();
        const restaurantKey = restaurantKeyById(id);
        const hashData = { id, name: data.name, location: data.location };
        const addResult = await client.hSet(restaurantKey, hashData);
        console.log(`Added ${addResult} fields`);
        return successResponse(response, hashData, 'Add new restaurant');
    } catch (err) {
        next(err);
    }
    response.send('hello world');
});

router.get(
    '/:restaurantId',
    checkRestaurantExists,
    async (request: Request<{ restaurantId: string }>, response, next) => {
        const { restaurantId } = request.params;
        try {
            const client = await initializeRedisClient();
            const restaurantKey = restaurantKeyById(restaurantId);
            const [viewCount, restaurant] = await Promise.all([
                client.hIncrBy(restaurantKey, 'viewCount', 1),
                client.hGetAll(restaurantKey),
            ]);
            return successResponse(response, restaurant);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
