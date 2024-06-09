import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { user, signup } from './routes/index.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});

const App = express();

App.listen(3000, () => {
    console.log('Server is running on port 3000');
});

App.use(express.json());
App.use('/api/user', user);
App.use('/api/signup', signup);