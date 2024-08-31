import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { signup, signin, forgotPassword, imagesUpload, Listing } from './routes/index.js';
import cors from 'cors';

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
App.use(cors({
    origin: '*', // Allow requests from all origins
    methods: 'GET,POST,PUT,DELETE', // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  }));
App.use(express.json());
App.use('/api/signup', signup);
App.use('/api/signin', signin);
App.use('/api/forgotPassword', forgotPassword);
App.use('/api/imagesUpload', imagesUpload);
App.use('/api/create-user-listing', Listing);