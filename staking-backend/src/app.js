import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect('mongodb://127.0.0.1:38128/staking-events', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
