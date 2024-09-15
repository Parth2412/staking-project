import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import './services/stakingService.js';

const app = express();

mongoose.connect(config.mongoString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(config.port, () => {
	console.log(`Server started on port ${config.port}`);
});
