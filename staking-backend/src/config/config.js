import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT,
	mongoString: process.env.MONGO_STRING,
	amoyWebsocketUrl: process.env.AMOY_WEBSCOKET_URL,
	contractAddress: process.env.CONTRACT_ADDRESS,
};
