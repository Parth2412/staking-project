# Staking backend

This project is a staking backend which will listen "Staked" and "Unstaked" event of the staking smart contract and based on the event it will perform the database operations.

## Directory Structure

```
staking-backend/ 
├── src/ 
│ ├── abi/ 
│ │ └── stakingContract.js # ABI file for interacting with the staking contract 
│ ├── config/ 
│ │ └── config.js # Configuration settings for the application 
│ ├── models/ 
│ │ └── stakingModel.js # Database model for staking-related data 
│ ├── services/ 
│ │ └── stakingService.js # Event listening code
│ ├──app.js # Main application entry point 
└── .env # Environment variables (e.g., PORT, MONGO_STRING, AMOY_WEBSCOKET_URL, CONTRACT_ADDRESS)
```

## Project setup

create ***.env*** file and enter following values

```
PORT=YOUR_DESIRED_PORT
MONGO_STRING=MONGODB_STRING
AMOY_WEBSCOKET_URL=POLYGON_WSS_URL_OF_AMOY_TESTNET
CONTRACT_ADDRESS=STAKING_CONTRACT_ADDRESS_THAT_WE_GOT_AT_TIME_OF_DEPLOYMENT
```

Install Dependencies

```
npm install
```

Start the server

```
npm run dev
```