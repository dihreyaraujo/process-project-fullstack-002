import express from 'express';
import rideRouter from './routes/rideRoutes';

const app = express();

app.use(express.json());
app.use('/ride', rideRouter);

export default app;
