
// Importing dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.router.js';
import profileRoutes from './routes/profile.router.js'
import postRoutes from './routes/post.router.js'
import path from 'path';
import { fileURLToPath } from "url";

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
app.use('/api/posts', postRoutes)

// static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


export default app;