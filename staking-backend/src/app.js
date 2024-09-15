import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
