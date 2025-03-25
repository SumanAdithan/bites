import express from 'express';
import { validate } from 'middlewares/validate.ts';
import { Restaurant, RestaurantSchema } from 'schemas/restaurant.ts';
const router = express.Router();

router.post('/', validate(RestaurantSchema), async (request, response, next) => {
    const data = request.body as Restaurant;
    response.send('hello world');
});

export default router;
