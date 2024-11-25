import express from 'express';
import cors from 'cors';
import rideRouter from './routes/rideRoutes';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/ride', rideRouter);

export default app;
