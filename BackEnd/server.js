import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';
import session from 'express-session';
//import passport from 'passport';
import passport from './config/passport.js'; // Default import

// Connecting to MongoDB
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// app.use(session({
//     secret: process.env.SESSION_SECRET || 'your_session_secret',
//     resave: false,
//     saveUninitialized: false,
//   }));

// Initialize Passport
//pp.use(passport.initialize());
//app.use(passport.session());
// Routes
app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
