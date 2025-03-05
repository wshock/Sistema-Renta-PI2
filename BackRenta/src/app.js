
// Importing dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Initializing
const app = express();

app.set("port", 5000);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());



app.listen()