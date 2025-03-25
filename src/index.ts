import express from 'express';
import restaurantsRoutes from './routes/restaurants.ts';
import cuisinesRoutes from './routes/cuisines.ts';
import { errorHandler } from 'middlewares/errorHandler.ts';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/restaurants', restaurantsRoutes);
app.use('/cuisines', cuisinesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
}).on('error', (err) => {
    throw new Error(err.message);
});
