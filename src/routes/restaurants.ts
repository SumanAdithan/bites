import express from 'express';
import { validate } from 'middlewares/validate.ts';
import { Restaurant, RestaurantSchema } from 'schemas/restaurant.ts';
import { initializeRedisClient } from 'utils/client.ts';
const router = express.Router();

router.post('/', validate(RestaurantSchema), async (request, response, next) => {
    const data = request.body as Restaurant;
    const client = await initializeRedisClient();
    response.send('hello world');
});

export default router;
