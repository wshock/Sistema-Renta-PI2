
// Importing dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.router.js';

// Initializing
const app = express();

app.set("port", 5000);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// Router routes

app.use('/api', authRoutes);


export default app;