
// Importing dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.router.js';
import profileRoutes from './routes/profile.router.js'

// Initializing
const app = express();

app.set("port", 5000);

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Router routes

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes)

export default app;